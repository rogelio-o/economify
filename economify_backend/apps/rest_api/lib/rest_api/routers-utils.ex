defmodule RoutersUtils do
  import Plug.Conn

  def send_entity_as_json(result, conn) do
    case result do
      {:not_found} ->
        send_empty(404, conn)

      {:bad_request} ->
        send_empty(400, conn)

      {:ok, entity} ->
        send_as_json(entity, 200, conn)
    end
  end

  def send_create_result_as_json(result, conn) do
    send_result_as_json(result, 201, conn)
  end

  def send_update_result_as_json(result, conn) do
    send_result_as_json(result, 200, conn)
  end

  def send_delete_result_as_json(result, conn) do
    case result do
      {:ok, _} -> send_empty(204, conn)
      {:not_found} -> send_empty(204, conn)
      {:bad_request} -> send_empty(400, conn)
    end
  end

  def send_as_json(body, status, conn) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(status, Poison.encode!(body))
  end

  def send_empty(status, conn) do
    conn
    |> send_resp(status, "")
  end

  def get_page(conn) do
    (conn.params["page"] || "1")
    |> String.to_integer()
  end

  def get_page_size(conn, default) do
    (conn.params["page_size"] || default)
    |> String.to_integer()
  end

  defp send_result_as_json(result, ok_status, conn) do
    case result do
      {:ok, transaction} -> send_as_json(transaction, ok_status, conn)
      {:form_error, errors} -> send_as_json(errors, 422, conn)
      {:not_found} -> send_empty(404, conn)
      {:bad_request} -> send_empty(400, conn)
    end
  end
end
