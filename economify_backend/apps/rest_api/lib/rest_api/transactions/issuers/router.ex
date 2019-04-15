defmodule RestApi.Transactions.Issuers.Router do
  use Plug.Router
  import RoutersUtils

  plug(:match)
  plug(:dispatch)

  get "/" do
    page = get_page(conn)
    page_size = get_page_size(conn, "5")

    Transactions.Interface.get_issuers_all_paginated(page, page_size)
    |> send_as_json(200, conn)
  end

  get "/:issuer_id" do
    conn.path_params["issuer_id"]
    |> Transactions.Interface.get_issuer_by_id()
    |> send_entity_as_json(conn)
  end

  post "/" do
    conn.body_params
    |> Transactions.Interface.create_issuer()
    |> send_create_result_as_json(conn)
  end

  put "/:issuer_id" do
    conn.path_params["issuer_id"]
    |> Transactions.Interface.update_issuer(conn.body_params)
    |> send_update_result_as_json(conn)
  end

  delete "/:issuer_id" do
    conn.path_params["issuer_id"]
    |> Transactions.Interface.delete_issuer()
    |> send_delete_result_as_json(conn)
  end
end
