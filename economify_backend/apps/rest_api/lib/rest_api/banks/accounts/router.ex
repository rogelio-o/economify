defmodule RestApi.Banks.Accounts.Router do
  use Plug.Router
  import RoutersUtils

  plug(:match)
  plug(:dispatch)

  get "/" do
    page = get_page(conn)
    page_size = get_page_size(conn, "5")

    Banks.Interface.get_accounts_all_paginated(page, page_size)
    |> send_as_json(200, conn)
  end

  get "/:bank_account_id" do
    conn.path_params["bank_account_id"]
    |> Banks.Interface.get_account_by_id()
    |> send_entity_as_json(conn)
  end

  post "/" do
    conn.body_params
    |> Banks.Interface.create_account()
    |> send_create_result_as_json(conn)
  end

  put "/:bank_account_id" do
    conn.path_params["bank_account_id"]
    |> Banks.Interface.update_account(conn.body_params)
    |> send_update_result_as_json(conn)
  end

  delete "/:bank_account_id" do
    conn.path_params["bank_account_id"]
    |> Banks.Interface.delete_account()
    |> send_delete_result_as_json(conn)
  end
end
