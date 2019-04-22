defmodule Transactions.Service do
  require Ecto.Query

  def create(params) do
    params_with_issuer_and_category = params
    |> add_issuer_to_params
    |> categorize

    %Transactions.Schema{}
    |> Transactions.Schema.changeset(params_with_issuer_and_category)
    |> Transactions.Repo.insert()
    |> preload_result
    |> Utils.parse_result()
  end

  defp add_issuer_to_params(params) do
    if Map.has_key?(params, "issuer_id") or not Map.has_key?(params, "issuer") do
      params
    else
      {:ok, issuer} = Issuers.Service.get_or_create_by_name(params["issuer"])
      Map.put(params, "issuer_id", issuer.issuer_id)
    end
  end

  defp categorize(params) do
    if Map.has_key?(params, "category_id") do
      params
    else
      Map.put(params, "category_id", Categories.Interface.categorize(params))
    end
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

  def get_all_paginated(page, page_size) do
    Ecto.Query.from(p in Transactions.Schema, order_by: [desc: p.date], preload: [:issuer])
    |> Transactions.Repo.paginate(page: page, page_size: page_size)
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

  defp preload_result(result) do
    case result do
      {:ok, transaction} ->
        {:ok, Transactions.Repo.preload(transaction, [:issuer])}

      _ ->
        result
    end
  end
end
