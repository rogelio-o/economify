defmodule RestApi.Transactions.Router do
  use Plug.Router

  plug(:match)
  plug(:dispatch)

  get "/" do
    page = conn.params["page"] || 1
    page_size = conn.params["page_size"] || 5

    send_json(conn, 200, Transactions.Interface.get_all_paginated(page, page_size))
  end

  get "/:transaction_id" do
    transaction_id = conn.path_params["transaction_id"]

    send_json(conn, 200, Transactions.Interface.get_by_id(transaction_id))
  end

  post "/" do
    {status, body} =
      case conn.body_params do
        %{"transactions" => transactions} -> {200, create_transactions(transactions)}
        _ -> {422, missing_transactions()}
      end

    send_json(conn, status, body)
  end

  defp create_transactions(transactions) do
    Enum.map(transactions, &create_transaction/1)
  end

  defp create_transaction(transaction) do
    case Transactions.Interface.create(transaction) do
      {:ok, created_transaction} ->
        %{
          transaction_id: created_transaction.transaction_id
        }

      {:error, errors} ->
        errors
    end
  end

  defp missing_transactions do
    %{error: "Expected Payload: { 'transactions': [...] }"}
  end

  put "/:transaction_id" do
    {status, body} = update_transaction(conn.path_params["transaction_id"], conn.body_params)

    send_json(conn, status, body)
  end

  defp update_transaction(transaction_id, params) do
    case Transactions.Interface.update(transaction_id, params) do
      {:ok, _} ->
        {200, %{success: true}}

      {:error, errors} ->
        {400, errors}
    end
  end

  delete "/:transaction_id" do
    {:ok, _} = Transactions.Interface.delete(conn.path_params["transaction_id"])

    send_json(conn, 200, %{success: true})
  end

  defp send_json(conn, status, body) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(status, Poison.encode!(body))
  end
end
