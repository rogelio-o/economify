defmodule Transactions.Service do
  require Ecto.Query

  def create(params) do
    params_with_issuer_and_category =
      params
      |> add_issuer_to_params

    %Transactions.Schema{}
    |> Transactions.Schema.changeset(params_with_issuer_and_category)
    |> categorize_if_no_category
    |> Transactions.Repo.insert()
    |> preload_result
    |> Utils.parse_result()
  end

  def create_bulk(transactions_params) do
    Enum.map(transactions_params, &create/1)
  end

  defp add_issuer_to_params(params) do
    if Map.has_key?(params, "issuer_id") or not Map.has_key?(params, "issuer") do
      params
    else
      {:ok, issuer} = Issuers.Service.get_or_create_by_name(params["issuer"])
      Map.put(params, "issuer_id", issuer.issuer_id)
    end
  end

  defp categorize_if_no_category(transaction_changeset) do
    transaction = Ecto.Changeset.apply_changes(transaction_changeset)

    if transaction.category_id != nil and transaction.category_id != "" do
      transaction_changeset
    else
      categorize(transaction_changeset, transaction)
    end
  end

  defp categorize(transaction_changeset, transaction) do
    Ecto.Changeset.put_change(
      transaction_changeset,
      :category_id,
      Categories.Interface.categorize(transaction)
    )
  end

  def update(transaction_id, params) do
    try do
      %Transactions.Schema{transaction_id: transaction_id}
      |> Transactions.Schema.changeset(params)
      |> Transactions.Repo.update()
      |> preload_result
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

  def get_all_paginated(page, page_size, params) do
    query =
      Ecto.Query.from(p in Transactions.Schema, order_by: [desc: p.date], preload: [:issuer])
      |> add_concept_where_to_query(params.concept)
      |> add_date_where_to_query(params.date)

    query
    |> Transactions.Repo.paginate(page: page, page_size: page_size)
  end

  defp add_concept_where_to_query(query, concept) do
    if concept do
      likeConcept = "%#{concept}%"
      Ecto.Query.from(q in query, where: ilike(q.concept, ^likeConcept))
    else
      query
    end
  end

  defp add_date_where_to_query(query, date) do
    if date do
      Ecto.Query.from(q in query, where: q.date == ^date)
    else
      query
    end
  end

  def get_by_id(transaction_id) do
    try do
      result =
        Transactions.Schema
        |> Transactions.Repo.get(transaction_id)
        |> Transactions.Repo.preload([:issuer])

      case result do
        nil -> {:not_found}
        _ -> {:ok, result}
      end
    rescue
      _e in Ecto.Query.CastError -> {:bad_request}
    end
  end

  def update_issuer(new_issuer_id, old_issuer_id) do
    Ecto.Query.from(p in Transactions.Schema, where: p.issuer_id == ^old_issuer_id)
    |> Transactions.Repo.update_all(set: [issuer_id: new_issuer_id])

    {:ok}
  end

  def recategorize_all() do
    Ecto.Query.from(p in Transactions.Schema,
      where: p.category_locked == false,
      order_by: [desc: p.date]
    )
    |> Transactions.Repo.all()
    |> Enum.map(&recategorize_transaction/1)
  end

  defp recategorize_transaction(transaction) do
    transaction
    |> Ecto.Changeset.change()
    |> categorize(transaction)
    |> Transactions.Repo.update()
  end

  defp preload_result(result) do
    case result do
      {:ok, transaction} ->
        {:ok, Transactions.Repo.preload(transaction, [:issuer])}

      _ ->
        result
    end
  end
end
