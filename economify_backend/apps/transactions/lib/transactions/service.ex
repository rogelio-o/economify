defmodule Transactions.Service do
  require Ecto.Query

  def create(params) do
    transaction = %Transactions.Schema{}
    changeset = Transactions.Schema.changeset(transaction, params)

    case Transactions.Repo.insert(changeset) do
      {:ok, created_transaction} ->
        {:ok, created_transaction}

      {:error, changeset} ->
        {:error, translate_errors(changeset)}
    end
  end

  def update(transaction_id, params) do
    transaction = get_by_id(transaction_id)
    changeset = Transactions.Schema.changeset(transaction, params)

    case Transactions.Repo.update(changeset) do
      {:ok, updated_transaction} ->
        {:ok, updated_transaction}

      {:error, changeset} ->
        {:error, translate_errors(changeset)}
    end
  end

  def delete(transaction_id) do
    transaction = get_by_id(transaction_id)
    Transactions.Repo.delete(transaction)
  end

  def get_all_paginated(page, page_size) do
    page =
      Ecto.Query.from(p in Transactions.Schema, order_by: [desc: p.date])
      |> Transactions.Repo.paginate(page: page, page_size: page_size)

    %{
      transactions: page.entries,
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
  end

  def get_by_id(transaction_id) do
    Transactions.Schema |> Transactions.Repo.get(transaction_id)
  end

  defp translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  defp translate_error({msg, opts}) do
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
    end)
  end
end
