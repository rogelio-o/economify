defmodule BanksAccounts.Schema do
  use Ecto.Schema

  @primary_key {:bank_account_id, :binary_id, autogenerate: true}
  @timestamps_opts [type: :utc_datetime]
  @derive {Poison.Encoder, except: [:__meta__, :inserted_at, :updated_at]}
  schema "banks_accounts" do
    field(:name, :string)
    field(:description, :string)

    timestamps(type: :utc_datetime)
  end

  def changeset(bank_account, params \\ %{}) do
    bank_account
    |> Ecto.Changeset.cast(params, [:name, :description])
    |> Ecto.Changeset.validate_required([:name])
  end
end
