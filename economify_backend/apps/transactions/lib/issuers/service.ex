defmodule Issuers.Service do
  require Ecto.Query

  def create(params) do
    %Issuers.Schema{}
    |> Issuers.Schema.changeset(params)
    |> Transactions.Repo.insert()
    |> Utils.parse_result()
  end

  def update(issuer_id, params) do
    try do
      %Issuers.Schema{issuer_id: issuer_id}
      |> Issuers.Schema.changeset(params)
      |> Transactions.Repo.update()
      |> Utils.parse_result()
    rescue
      _e in Ecto.StaleEntryError -> {:not_found}
      _e in Ecto.ChangeError -> {:bad_request}
    end
  end

  def delete(issuer_id) do
    case get_by_id(issuer_id) do
      {:not_found} -> {:not_found}
      {:bad_request} -> {:bad_request}
      {:ok, issuer} -> Transactions.Repo.delete(issuer)
    end
  end

  def get_all_paginated(page, page_size) do
    Ecto.Query.from(p in Issuers.Schema, order_by: [desc: p.date])
    |> Transactions.Repo.paginate(page: page, page_size: page_size)
  end

  def get_by_id(issuer_id) do
    try do
      result = Issuers.Schema |> Transactions.Repo.get(issuer_id)

      case result do
        nil -> {:not_found}
        _ -> {:ok, result}
      end
    rescue
      _e in Ecto.Query.CastError -> {:bad_request}
    end
  end
end
