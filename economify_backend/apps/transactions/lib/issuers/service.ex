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

  def get_all_paginated(page, page_size, params) do
    query =
      Ecto.Query.from(p in Issuers.Schema, order_by: [asc: p.name])
      |> add_name_where_to_query(params.name)

    query
    |> Transactions.Repo.paginate(page: page, page_size: page_size)
  end

  defp add_name_where_to_query(query, name) do
    if name do
      likeName = "%#{name}%"
      Ecto.Query.from(q in query, where: ilike(q.name, ^likeName))
    else
      query
    end
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

  def get_or_create_by_name(name) do
    issuer = get_by_name_or_alias(name)

    case issuer do
      nil -> create(%{name: name})
      _ -> {:ok, issuer}
    end
  end

  defp get_by_name_or_alias(name) do
    Ecto.Query.from(p in Issuers.Schema,
      where: p.name == ^name or fragment("? = ANY (?)", ^name, p.alias)
    )
    |> Ecto.Query.first()
    |> Transactions.Repo.one()
  end

  def merge(issuer_a_id, issuer_b_id) do
    {:ok, issuer_a} = get_by_id(issuer_a_id)
    {:ok, issuer_b} = get_by_id(issuer_b_id)

    issuer_a_alias =
      case issuer_a.alias do
        nil -> []
        _ -> issuer_a.alias
      end

    issuer_b_alias =
      case issuer_b.alias do
        nil -> []
        _ -> issuer_b.alias
      end

    issuer_b_name = issuer_b.name
    new_alias = issuer_a_alias ++ issuer_b_alias ++ [issuer_b_name]
    changeset = Issuers.Schema.set_alias(issuer_a, new_alias)

    {:ok} = Transactions.Service.update_issuer(issuer_a_id, issuer_b_id)

    {:ok, issuer_a} =
      changeset
      |> Transactions.Repo.update()

    {:ok, _} =
      issuer_b
      |> Transactions.Repo.delete()

    {:ok, issuer_a}
  end
end
