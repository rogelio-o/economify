defmodule Transactions.Repo.Migrations.CreateIssuersTable do
  use Ecto.Migration

  def change do
    create table(:issuers, primary_key: false) do
      add(:issuer_id, :uuid, null: false, primary_key: true)
      add(:name, :string, null: false)
      add(:description, :string, null: true)
      add(:inserted_at, :utc_datetime, default: fragment("now()"))
      add(:updated_at, :utc_datetime, default: fragment("now()"))
    end
  end
end
