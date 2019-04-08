defmodule EconomifyBackend.Transactions.Router do
  use Plug.Router

  require Ecto.Query

  plug(:match)
  plug(:dispatch)

  get "/" do
    page = conn.params["page"] || 1
    page_size = conn.params["page_size"] || 5

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(get_transactions(page, page_size)))
  end

  defp get_transactions(page, page_size) do
    page =
      (Ecto.Query.from p in EconomifyBackend.Transactions.Schema, order_by: [desc: p.date])
      |> EconomifyBackend.Repo.paginate(page: page, page_size: page_size)

    %{
      transactions: page.entries,
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
  end

  post "/" do
    {status, body} =
      case conn.body_params do
        %{"transactions" => transactions} -> {200, create_transactions(transactions)}
        _ -> {422, missing_transactions()}
      end

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(status, Poison.encode!(body))
  end

  defp create_transactions(transactions) do
    Enum.map(transactions, &create_transaction/1)
  end

  defp create_transaction(params) do
    transaction = %EconomifyBackend.Transactions.Schema{}
    changeset = EconomifyBackend.Transactions.Schema.changeset(transaction, params)
    case EconomifyBackend.Repo.insert(changeset) do
      {:ok, transaction} ->
        %{
          transaction_id: transaction.transaction_id
        }
      {:error, changeset} ->
        translate_errors(changeset)
    end
  end

  defp missing_transactions do
    %{error: "Expected Payload: { 'transactions': [...] }"}
  end

  get "/:transaction_id" do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(get_transaction_by_id(conn.path_params["transaction_id"])))
  end

  defp get_transaction_by_id(transaction_id) do
    EconomifyBackend.Transactions.Schema |> EconomifyBackend.Repo.get(transaction_id)
  end

  put "/:transaction_id" do
    {status, body} = update_transaction(conn.path_params["transaction_id"], conn.body_params)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(status, Poison.encode!(body))
  end

  defp update_transaction(transaction_id, params) do
    transaction = get_transaction_by_id(transaction_id)
    changeset = EconomifyBackend.Transactions.Schema.changeset(transaction, params)
    case EconomifyBackend.Repo.update(changeset) do
      {:ok, _} ->
        {200, %{success: true}}
      {:error, changeset} ->
        {400, translate_errors(changeset)}
    end
  end

  delete "/:transaction_id" do
    {status, body} = delete_transaction(conn.path_params["transaction_id"])

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(status, Poison.encode!(body))
  end

  defp delete_transaction(transaction_id) do
    transaction = get_transaction_by_id(transaction_id)
    {:ok, _} = EconomifyBackend.Repo.delete(transaction)
    {200, %{success: true}}
  end

  defp translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  defp translate_error({msg, opts}) do
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
    end)
  end
end
