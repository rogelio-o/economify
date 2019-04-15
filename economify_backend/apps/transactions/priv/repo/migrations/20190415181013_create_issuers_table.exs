defmodule Transactions.Repo.Migrations.CreateIssuersTable do
  use Ecto.Migration

  def change do
    create table(:issuers, primary_key: false) do
      add(:issuer_id, :uuid, null: false, primary_key: true)
      add(:name, :string, null: false)
      add(:description, :string, null: true)

      timestamps(type: :utc_datetime)
    end
  end

  def down do
    drop(table("issuers"))
  end
end
