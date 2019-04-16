import EctoEnum
defenum(TypeEnum, income: 0, expense: 1)

defmodule Categories.Schema do
  use Ecto.Schema

  @primary_key {:category_id, :binary_id, autogenerate: true}
  @timestamps_opts [type: :utc_datetime]
  @derive {Poison.Encoder, except: [:__meta__, :inserted_at, :updated_at]}
  schema "categories" do
    field(:name, :string)
    field(:description, :string)
    field(:type, TypeEnum)

    timestamps(type: :utc_datetime)
  end

  def changeset(category, params \\ %{}) do
    category
    |> Ecto.Changeset.cast(params, [:name])
    |> Ecto.Changeset.validate_required([:name])
  end
end
