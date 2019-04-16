defmodule RestApi.Categories.Router do
  use Plug.Router
  import RoutersUtils

  plug(:match)
  plug(:dispatch)

  get "/" do
    page = get_page(conn)
    page_size = get_page_size(conn, "5")

    Categories.Interface.get_categories_all_paginated(page, page_size)
    |> send_as_json(200, conn)
  end

  get "/:category_id" do
    conn.path_params["category_id"]
    |> Categories.Interface.get_category_by_id()
    |> send_entity_as_json(conn)
  end

  post "/" do
    conn.body_params
    |> Categories.Interface.create_category()
    |> send_create_result_as_json(conn)
  end

  put "/:category_id" do
    conn.path_params["category_id"]
    |> Categories.Interface.update_category(conn.body_params)
    |> send_update_result_as_json(conn)
  end

  delete "/:category_id" do
    conn.path_params["category_id"]
    |> Categories.Interface.delete_category()
    |> send_delete_result_as_json(conn)
  end
end
