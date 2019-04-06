defmodule EconomifyBackend.Transactions.Schema do
  use Ecto.Schema

  @primary_key {:transaction_id, :binary_id, autogenerate: true}
  @derive {Poison.Encoder, except: [:__meta__, :inserted_at, :updated_at]}
  schema "transactions" do
    field :bank_id, :string
    field :category_id, :string
    field :concept, :string
    field :amount, :float
    field :date, :date
    field :inserted_at, :utc_datetime
    field :updated_at, :utc_datetime
  end

  def changeset(transaction, params \\ %{}) do
    transaction
    |> Ecto.Changeset.cast(params, [:bank_id, :category_id, :concept, :amount, :date])
    |> Ecto.Changeset.validate_required([:bank_id, :category_id, :concept, :amount, :date])
  end
end
