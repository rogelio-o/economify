defmodule Rules.Service do
  require Ecto.Query

  def create(category_id, params) do
    %Rules.Schema{category_id: category_id}
    |> Rules.Schema.changeset(params)
    |> Categories.Repo.insert()
    |> Utils.parse_result()
  end

  def update(category_id, rule_id, params) do
    try do
      %Rules.Schema{category_id: category_id, category_rule_id: rule_id}
      |> Rules.Schema.changeset(params)
      |> Categories.Repo.update()
      |> Utils.parse_result()
    rescue
      _e in Ecto.StaleEntryError -> {:not_found}
      _e in Ecto.ChangeError -> {:bad_request}
    end
  end

  def delete(category_id, rule_id) do
    case get_by_id(category_id, rule_id) do
      {:not_found} -> {:not_found}
      {:bad_request} -> {:bad_request}
      {:ok, rule} -> Categories.Repo.delete(rule)
    end
  end

  def get_all_paginated(category_id, page, page_size) do
    Ecto.Query.from(p in Rules.Schema, where: p.category_id == ^category_id, order_by: [asc: p.name])
    |> Categories.Repo.paginate(page: page, page_size: page_size)
  end

  def get_by_id(category_id, rule_id) do
    try do
      result = Rules.Schema |> Categories.Repo.get(rule_id)

      case result do
        nil -> {:not_found}
        _ -> get_by_id_and_category(category_id, result)
      end
    rescue
      _e in Ecto.Query.CastError -> {:bad_request}
    end
  end

  def get_by_id_and_category(category_id, rule) do
    if rule.category_id === category_id do
      {:ok, rule}
    else
      {:not_found}
    end
  end
end
