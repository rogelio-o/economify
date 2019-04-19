defmodule RestApi.Categories.Rules.Router do
  use Plug.Router
  import RoutersUtils

  plug(:match)
  plug(:dispatch)

  get "/" do
    page = get_page(conn)
    page_size = get_page_size(conn, "5")

    Categories.Interface.get_rules_all_paginated(conn.path_params["category_id"], page, page_size)
    |> send_as_json(200, conn)
  end

  get "/:rule_id" do
    conn.path_params["category_id"]
    |> Categories.Interface.get_rule_by_id(conn.path_params["rule_id"])
    |> send_entity_as_json(conn)
  end

  post "/" do
    conn.path_params["category_id"]
    |> Categories.Interface.create_rule(conn.body_params)
    |> send_create_result_as_json(conn)
  end

  put "/:rule_id" do
    conn.path_params["category_id"]
    |> Categories.Interface.update_rule(conn.path_params["rule_id"], conn.body_params)
    |> send_update_result_as_json(conn)
  end

  delete "/:rule_id" do
    conn.path_params["category_id"]
    |> Categories.Interface.delete_rule(conn.path_params["rule_id"])
    |> send_delete_result_as_json(conn)
  end
end
