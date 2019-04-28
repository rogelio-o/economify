defmodule RestApi.Transactions.Router do
  use Plug.Router
  import RoutersUtils

  plug(:match)
  plug(:dispatch)

  get "/" do
    page = get_page(conn)
    page_size = get_page_size(conn, "5")

    Transactions.Interface.get_transactions_all_paginated(
      page,
      page_size,
      %{
        concept: conn.params["concept"],
        date: conn.params["date"]
      }
    )
    |> send_as_json(200, conn)
  end

  get "/:transaction_id" do
    conn.path_params["transaction_id"]
    |> Transactions.Interface.get_transaction_by_id()
    |> send_entity_as_json(conn)
  end

  post "/" do
    conn.body_params
    |> Transactions.Interface.create_transaction()
    |> send_create_result_as_json(conn)
  end

  post "/bulk" do
    body = conn.body_params

    if Map.has_key?(body, "transactions") do
      results =
        body["transactions"]
        |> Transactions.Interface.create_transactions()
        |> Enum.map(&parse_bulk_result/1)

      send_as_json(%{results: results}, 200, conn)
    else
      send_as_json(%{transactions: ["is required"]}, 422, conn)
    end
  end

  post "/recategorize" do
    Transactions.Interface.recategorize_all()

    send_empty(204, conn)
  end

  defp parse_bulk_result(result) do
    case result do
      {:ok, transaction} -> %{success: true, result: transaction}
      {_, errors} -> %{success: false, errors: errors}
    end
  end

  put "/:transaction_id" do
    conn.path_params["transaction_id"]
    |> Transactions.Interface.update_transaction(conn.body_params)
    |> send_update_result_as_json(conn)
  end

  delete "/:transaction_id" do
    conn.path_params["transaction_id"]
    |> Transactions.Interface.delete_transaction()
    |> send_delete_result_as_json(conn)
  end
end
