defmodule EconomifyBackend.Transactions.Router do
  use Plug.Router

  plug(:match)
  plug(:dispatch)

  get "/" do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(get_transaction()))
  end

  defp get_transaction do
    EconomifyBackend.Transactions.Schema |> Ecto.Query.first |> EconomifyBackend.Repo.one
  end

  post "/" do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(create_transaction()))
  end

  defp create_transaction do
    transaction = %EconomifyBackend.Transactions.Schema{}
    changeset = EconomifyBackend.Transactions.Schema.changeset(transaction, %{
      #bank_id: "1234",
      category_id: "1234",
      concept: "test",
      amount: 100.50,
      date: Date.utc_today
    })
    case EconomifyBackend.Repo.insert(changeset) do
      {:ok, transaction} ->
        %{
          transaction_id: transaction.transaction_id
        }
      {:error, changeset} ->
        translate_errors(changeset)
    end
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
