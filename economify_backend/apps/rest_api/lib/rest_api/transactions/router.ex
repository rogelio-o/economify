defmodule RestApi.Transactions.Router do
  use Plug.Router

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

  defp send_entity_as_json(result, conn) do
    case result do
      {:not_found} ->
        send_empty(404, conn)

      {:bad_request} ->
        send_empty(400, conn)

      {:ok, entity} ->
        send_as_json(entity, 200, conn)
    end
  end

  defp send_result_as_json(result, ok_status, conn) do
    case result do
      {:ok, transaction} -> send_as_json(transaction, ok_status, conn)
      {:form_error, errors} -> send_as_json(errors, 422, conn)
      {:not_found} -> send_empty(404, conn)
      {:bad_request} -> send_empty(400, conn)
    end
  end

  defp send_create_result_as_json(result, conn) do
    send_result_as_json(result, 201, conn)
  end

  defp send_update_result_as_json(result, conn) do
    send_result_as_json(result, 200, conn)
  end

  defp send_delete_result_as_json(result, conn) do
    case result do
      {:ok, _} -> send_empty(204, conn)
      {:not_found} -> send_empty(204, conn)
      {:bad_request} -> send_empty(400, conn)
    end
  end

  defp send_as_json(body, status, conn) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(status, Poison.encode!(body))
  end

  defp send_empty(status, conn) do
    conn
    |> send_resp(status, "")
  end

  defp get_page(conn) do
    (conn.params["page"] || "1")
    |> String.to_integer()
  end

  defp get_page_size(conn, default) do
    (conn.params["page_size"] || default)
    |> String.to_integer()
  end
end
