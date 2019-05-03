defmodule Transactions.Statistics.Service do
  require Ecto.Query

  def by_category(year) do
    Enum.to_list(1..12)
    |> Enum.map(fn month -> by_category_and_month(month, year) end)
  end

  defp by_category_and_month(month, year) do
    {:ok, start_date} = Date.from_erl({year, month, 1})
    end_date =
      start_date
      |> Date.add(Date.days_in_month(start_date))

    Ecto.Query.from(p in Transactions.Schema, where: p.date >= ^start_date and p.date <= ^end_date)
      |> Transactions.Repo.all
      |> Enum.group_by(fn t -> t.category_id end, fn t -> t.amount end)
      |> Enum.map(fn {category_id, amounts} -> {category_id, Enum.sum(amounts)} end)
      |> Enum.into(%{})
  end

end
