defmodule BanksAccounts.Service do
  require Ecto.Query

  def create(params) do
    %BanksAccounts.Schema{}
    |> BanksAccounts.Schema.changeset(params)
    |> Banks.Repo.insert()
    |> Utils.parse_result()
  end

  def update(bank_account_id, params) do
    try do
      %BanksAccounts.Schema{bank_account_id: bank_account_id}
      |> BanksAccounts.Schema.changeset(params)
      |> Banks.Repo.update()
      |> Utils.parse_result()
    rescue
      _e in Ecto.StaleEntryError -> {:not_found}
      _e in Ecto.ChangeError -> {:bad_request}
    end
  end

  def delete(bank_account_id) do
    case get_by_id(bank_account_id) do
      {:not_found} -> {:not_found}
      {:bad_request} -> {:bad_request}
      {:ok, bank_account} -> Banks.Repo.delete(bank_account)
    end
  end

  def get_all_paginated(page, page_size) do
    Ecto.Query.from(p in BanksAccounts.Schema, order_by: [asc: p.name])
    |> Banks.Repo.paginate(page: page, page_size: page_size)
  end

  def get_by_id(bank_account_id) do
    try do
      result = BanksAccounts.Schema |> Banks.Repo.get(bank_account_id)

      case result do
        nil -> {:not_found}
        _ -> {:ok, result}
      end
    rescue
      _e in Ecto.Query.CastError -> {:bad_request}
    end
  end
end
