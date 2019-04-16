defmodule Categories.Service do
  require Ecto.Query

  def create(params) do
    %Categories.Schema{}
    |> Categories.Schema.changeset(params)
    |> Categories.Repo.insert()
    |> Utils.parse_result()
  end

  def update(category_id, params) do
    try do
      %Categories.Schema{category_id: category_id}
      |> Categories.Schema.changeset(params)
      |> Categories.Repo.update()
      |> Utils.parse_result()
    rescue
      _e in Ecto.StaleEntryError -> {:not_found}
      _e in Ecto.ChangeError -> {:bad_request}
    end
  end

  def delete(category_id) do
    case get_by_id(category_id) do
      {:not_found} -> {:not_found}
      {:bad_request} -> {:bad_request}
      {:ok, category} -> Categories.Repo.delete(category)
    end
  end

  def get_all_paginated(page, page_size) do
    Ecto.Query.from(p in Categories.Schema, order_by: [asc: p.name])
    |> Categories.Repo.paginate(page: page, page_size: page_size)
  end

  def get_by_id(category_id) do
    try do
      result = Categories.Schema |> Categories.Repo.get(category_id)

      case result do
        nil -> {:not_found}
        _ -> {:ok, result}
      end
    rescue
      _e in Ecto.Query.CastError -> {:bad_request}
    end
  end
end
