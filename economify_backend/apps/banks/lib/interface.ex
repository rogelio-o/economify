defmodule Banks.Interface do
  defdelegate create_account(params), to: BanksAccounts.Service, as: :create
  defdelegate update_account(transaction_id, params), to: BanksAccounts.Service, as: :update
  defdelegate delete_account(transaction_id), to: BanksAccounts.Service, as: :delete

  defdelegate get_accounts_all_paginated(page, page_size),
    to: BanksAccounts.Service,
    as: :get_all_paginated

  defdelegate get_account_by_id(transaction_id),
    to: BanksAccounts.Service,
    as: :get_by_id
end
