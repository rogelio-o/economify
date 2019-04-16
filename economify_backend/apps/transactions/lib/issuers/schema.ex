defmodule Issuers.Schema do
  use Ecto.Schema

  @primary_key {:issuer_id, :binary_id, autogenerate: true}
  @timestamps_opts [type: :utc_datetime]
  @derive {Poison.Encoder, except: [:__meta__, :inserted_at, :updated_at]}
  schema "issuers" do
    field(:name, :string)
    field(:description, :string)

    timestamps(type: :utc_datetime)
  end

  def changeset(issuer, params \\ %{}) do
    issuer
    |> Ecto.Changeset.cast(params, [:name, :description])
    |> Ecto.Changeset.validate_required([:name])
  end
end
