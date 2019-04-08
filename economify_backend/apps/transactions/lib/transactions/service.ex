defmodule Transactions.Service do
  def create(service) do
    transaction = %Transactions.Schema{}

    changeset =
      Transactions.Schema.changeset(transaction, %{
        # bank_id: "1234",
        category_id: "1234",
        concept: "test",
        amount: 100.50,
        date: Date.utc_today()
      })

    case Transactions.Repo.insert(changeset) do
      {:ok, transaction} ->
        %{
          transaction_id: transaction.transaction_id
        }

      {:error, changeset} ->
        translate_errors(changeset)
    end
  end
end
