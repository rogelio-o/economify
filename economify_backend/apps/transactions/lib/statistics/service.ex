defmodule Transactions.Statistics.Service do
  require Ecto.Query

  @default_category_id_expense "default-expense"
  @default_category_id_income "default-income"

  def by_category(year) do
    statistics = statistics_by_category(year)
    data = data_by_category(statistics)

    %{
      statistics: statistics,
      data: data
    }
  end

  defp statistics_by_category(year) do
    Enum.to_list(1..12)
    |> Enum.map(fn month -> statistics_by_category_and_month(month, year) end)
  end

  defp statistics_by_category_and_month(month, year) do
    {:ok, start_date} = Date.from_erl({year, month, 1})

    end_date =
      start_date
      |> Date.add(Date.days_in_month(start_date))

    Ecto.Query.from(p in Transactions.Schema, where: p.date >= ^start_date and p.date <= ^end_date)
    |> Transactions.Repo.all()
    |> Enum.group_by(fn t -> t.category_id end, fn t -> t.amount end)
    |> Enum.map(fn {category_id, amounts} -> {category_id, round_price(Enum.sum(amounts))} end)
    |> Enum.map(fn {category_id, amount} ->
      {transform_empty_category_id(category_id, amount), amount}
    end)
    |> Enum.into(%{})
  end

  defp transform_empty_category_id(category_id, amount) do
    if category_id == nil do
      if amount > 0 do
        @default_category_id_income
      else
        @default_category_id_expense
      end
    else
      category_id
    end
  end

  defp data_by_category(statistics) do
    categories_ids =
      statistics
      |> Enum.flat_map(fn m -> Map.keys(m) end)
      |> Enum.uniq()

    categories_ids
    |> Enum.filter(fn category_id -> category_id != nil end)
    |> Enum.map(fn category_id -> {category_id, data_by_category_id(category_id)} end)
    |> Enum.into(%{})
  end

  defp data_by_category_id(category_id) do
    case category_id do
      @default_category_id_income ->
        %{
          name: "Default income",
          type: :income
        }

      @default_category_id_expense ->
        %{
          name: "Default expense",
          type: :expense
        }

      _ ->
        {:ok, category} = Categories.Interface.get_category_by_id(category_id)

        %{
          name: category.name,
          type: category.type
        }
    end
  end

  def saves(year) do
    statistics = statistics_saves(year)

    %{
      statistics: statistics
    }
  end

  defp statistics_saves(year) do
    Enum.to_list(1..12)
    |> Enum.map(fn month -> statistics_saves_by_month(month, year) end)
  end

  defp statistics_saves_by_month(month, year) do
    {:ok, start_date} = Date.from_erl({year, month, 1})

    end_date =
      start_date
      |> Date.add(Date.days_in_month(start_date))

    Ecto.Query.from(p in Transactions.Schema, where: p.date >= ^start_date and p.date <= ^end_date)
    |> Transactions.Repo.all()
    |> Enum.map(fn t -> t.amount end)
    |> Enum.sum()
    |> round_price()
  end

  defp round_price(float) when is_float(float), do: Float.round(float, 2)
  defp round_price(int) when is_integer(int), do: int
end
