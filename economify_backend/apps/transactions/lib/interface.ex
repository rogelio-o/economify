defmodule Transactions.Interface do
  defdelegate create_transaction(params), to: Transactions.Service, as: :create
  defdelegate update_transaction(transaction_id, params), to: Transactions.Service, as: :update
  defdelegate delete_transaction(transaction_id), to: Transactions.Service, as: :delete

  defdelegate get_transactions_all_paginated(page, page_size),
    to: Transactions.Service,
    as: :get_all_paginated

  defdelegate get_transaction_by_id(transaction_id), to: Transactions.Service, as: :get_by_id

  defdelegate create_issuer(params), to: Issuers.Service, as: :create
  defdelegate update_issuer(issuer_id, params), to: Issuers.Service, as: :update
  defdelegate delete_issuer(issuer_id), to: Issuers.Service, as: :delete

  defdelegate get_issuers_all_paginated(page, page_size),
    to: Issuers.Service,
    as: :get_all_paginated

  defdelegate get_issuer_by_id(issuer_id), to: Issuers.Service, as: :get_by_id
end
