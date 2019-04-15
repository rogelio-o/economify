import EctoEnum
defenum(StatusEnum, created: 0, categorizing: 1, categorized: 2)

defmodule Transactions.Schema do
  use Ecto.Schema

  @primary_key {:transaction_id, :binary_id, autogenerate: true}
  @timestamps_opts [type: :utc_datetime]
  @foreign_key_type :binary_id
  @derive {Poison.Encoder, except: [:__meta__, :inserted_at, :updated_at]}
  schema "transactions" do
    field(:bank_id, :string)
    field(:category_id, :string)
    field(:status, StatusEnum, default: :created)
    field(:concept, :string)
    field(:amount, :float)
    field(:date, :date)

    timestamps(type: :utc_datetime)
    belongs_to(:issuer, Issuers.Schema, references: :issuer_id)
  end

  def changeset(transaction, params \\ %{}) do
    transaction
    |> Ecto.Changeset.cast(params, [:bank_id, :category_id, :issuer_id, :concept, :amount, :date])
    |> Ecto.Changeset.validate_required([
      :bank_id,
      :category_id,
      :issuer_id,
      :concept,
      :amount,
      :date
    ])
    |> Ecto.Changeset.foreign_key_constraint(:issuers, name: :transactions_issuer_id_fkey)
  end
end
