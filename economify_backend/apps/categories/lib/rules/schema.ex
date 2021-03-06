import EctoEnum
defenum(RuleType, concept: 0, issuer: 1)

defmodule Rules.Schema do
  use Ecto.Schema

  @primary_key {:category_rule_id, :binary_id, autogenerate: true}
  @timestamps_opts [type: :utc_datetime]
  @foreign_key_type :binary_id
  @derive {Poison.Encoder, except: [:__meta__, :inserted_at, :updated_at, :category]}
  schema "categories_rules" do
    field(:name, :string)
    field(:description, :string)
    field(:priority, :integer)
    field(:type, RuleType)
    field(:params, :map)

    timestamps(type: :utc_datetime)
    belongs_to(:category, Categories.Schema, references: :category_id)
  end

  def changeset(rule, params \\ %{}) do
    rule
    |> Ecto.Changeset.cast(params, [:name, :description, :priority, :params, :type])
    |> Ecto.Changeset.validate_required([:name, :priority, :category_id, :type])
    |> Ecto.Changeset.foreign_key_constraint(:issuers, name: :rules_category_id_fkey)
  end
end
