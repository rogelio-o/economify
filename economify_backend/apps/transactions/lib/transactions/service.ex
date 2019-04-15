defmodule Transactions.Service do
  require Ecto.Query

  def create(params) do
    %Transactions.Schema{}
    |> Transactions.Schema.changeset(params)
    |> Transactions.Repo.insert()
    |> Utils.parse_result()
  end

  def update(transaction_id, params) do
    try do
      %Transactions.Schema{transaction_id: transaction_id}
      |> Transactions.Schema.changeset(params)
      |> Transactions.Repo.update()
      |> Utils.parse_result()
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
end
