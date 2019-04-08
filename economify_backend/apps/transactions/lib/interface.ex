defmodule Transactions.Interface do
  defdelegate create(params), to: Transactions.Service
  defdelegate update(transaction_id, params), to: Transactions.Service
  defdelegate delete(transaction_id), to: Transactions.Service
  defdelegate get_all_paginated(page, page_size), to: Transactions.Service
  defdelegate get_by_id(transaction_id), to: Transactions.Service
end
