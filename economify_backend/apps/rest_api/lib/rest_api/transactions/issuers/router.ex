defmodule RestApi.Transactions.Issuers.Router do
  use Plug.Router
  import RoutersUtils

  plug(:match)
  plug(:dispatch)

  get "/" do
    page = get_page(conn)
    page_size = get_page_size(conn, "5")

    Transactions.Interface.get_issuers_all_paginated(
      page,
      page_size,
      %{name: conn.params["name"]}
    )
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

  put "/:issuer_a_id/merge/:issuer_b_id" do
    {:ok, issuer_a} =
      conn.path_params["issuer_a_id"]
      |> Transactions.Interface.merge_issuers(conn.path_params["issuer_b_id"])

    send_as_json(issuer_a, 200, conn)
  end

  delete "/:issuer_id" do
    conn.path_params["issuer_id"]
    |> Transactions.Interface.delete_issuer()
    |> send_delete_result_as_json(conn)
  end
end
