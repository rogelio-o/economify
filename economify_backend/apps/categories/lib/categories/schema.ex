import EctoEnum
defenum(TypeEnum, income: 0, expense: 1, not_computable: 2)

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
    |> Ecto.Changeset.cast(params, [:name, :description, :type])
    |> Ecto.Changeset.validate_required([:name, :type])
    |> Ecto.Changeset.validate_inclusion(:type, TypeEnum.__valid_values__())
  end

  def get_type_by_amount(amount) do
    cond do
      amount > 0 -> 0
      amount == 0 -> 2
      true -> 1
    end
  end
end
