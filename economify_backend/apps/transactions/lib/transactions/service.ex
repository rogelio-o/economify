defmodule Transactions.Service do
  require Ecto.Query

  def create(params) do
    %Transactions.Schema{}
    |> Transactions.Schema.changeset(params)
    |> Transactions.Repo.insert()
    |> parse_result
  end

  def update(transaction_id, params) do
    try do
      %Transactions.Schema{transaction_id: transaction_id}
      |> Transactions.Schema.changeset(params)
      |> Transactions.Repo.update()
      |> parse_result
    rescue
      _e in Ecto.StaleEntryError -> {:not_found}
      _e in Ecto.ChangeError -> {:bad_request}
    end
  end

  def delete(transaction_id) do
    case get_by_id(transaction_id) do
      {:not_found} -> {:not_found}
      {:bad_request} -> {:bad_request}
      {:ok, transaction} -> Transactions.Repo.delete(transaction)
    end
  end

  def get_all_paginated(page, page_size) do
    Ecto.Query.from(p in Transactions.Schema, order_by: [desc: p.date])
    |> Transactions.Repo.paginate(page: page, page_size: page_size)
  end

  def get_by_id(transaction_id) do
    try do
      result = Transactions.Schema |> Transactions.Repo.get(transaction_id)

      case result do
        nil -> {:not_found}
        _ -> {:ok, result}
      end
    rescue
      _e in Ecto.Query.CastError -> {:bad_request}
    end
  end

  defp translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  defp parse_result(result) do
    case result do
      {:ok, transaction} ->
        {:ok, transaction}

      {:error, changeset} ->
        {:form_error, translate_errors(changeset)}
    end
  end

  defp translate_error({msg, opts}) do
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
    end)
  end
end
