defmodule Banks.Repo.Migrations.CreateBanksAccountsTable do
  use Ecto.Migration

  def change do
    create table(:banks_accounts, primary_key: false) do
      add(:bank_account_id, :uuid, null: false, primary_key: true)
      add(:name, :string, null: false)
      add(:description, :string, null: true)

      timestamps(type: :utc_datetime)
    end
  end

  def down do
    drop(table("banks_accounts"))
  end
end
