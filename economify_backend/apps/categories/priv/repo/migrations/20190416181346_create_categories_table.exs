defmodule Categories.Repo.Migrations.CreateCategoriesTable do
  use Ecto.Migration

  def change do
    create table(:categories, primary_key: false) do
      add(:category_id, :uuid, null: false, primary_key: true)
      add(:name, :string, null: false)
      add(:description, :string)
      add(:type, TypeEnum.type(), null: false)

      timestamps(type: :utc_datetime)
    end
  end

  def down do
    drop(table("categories"))
  end
end
