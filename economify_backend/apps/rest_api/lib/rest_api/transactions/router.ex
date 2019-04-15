defmodule RestApi.Transactions.Router do
  use Plug.Router
  import RoutersUtils

  plug(:match)
  plug(:dispatch)

  get "/" do
    page = get_page(conn)
    page_size = get_page_size(conn, "5")

    Transactions.Interface.get_all_paginated(page, page_size)
    |> send_as_json(200, conn)
  end

  get "/:transaction_id" do
    conn.path_params["transaction_id"]
    |> Transactions.Interface.get_by_id()
    |> send_entity_as_json(conn)
  end

  post "/" do
    conn.body_params
    |> Transactions.Interface.create()
    |> send_create_result_as_json(conn)
  end

  put "/:transaction_id" do
    conn.path_params["transaction_id"]
    |> Transactions.Interface.update(conn.body_params)
    |> send_update_result_as_json(conn)
  end

  delete "/:transaction_id" do
    conn.path_params["transaction_id"]
    |> Transactions.Interface.delete()
    |> send_delete_result_as_json(conn)
  end
end
