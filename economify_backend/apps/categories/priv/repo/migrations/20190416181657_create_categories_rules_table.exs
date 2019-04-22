defmodule Categories.Repo.Migrations.CreateCategoriesRulesTable do
  use Ecto.Migration

  def change do
    create table(:categories_rules, primary_key: false) do
      add(:category_rule_id, :uuid, null: false, primary_key: true)
      add(:name, :string, null: false)
      add(:description, :string)
      add(:priority, :integer, null: false)
      add(:type, RuleType.type(), null: false)
      add(:params, :map)

      timestamps(type: :utc_datetime)

      add(
        :category_id,
        references("categories",
          type: :uuid,
          column: :category_id,
          on_delete: :delete_all,
          on_update: :update_all
        ),
        null: false
      )
    end
  end

  def down do
    drop(table("categories_rules"))
  end
end
