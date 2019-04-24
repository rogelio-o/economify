defmodule Transactions.Repo.Migrations.CreateTransactions do
  use Ecto.Migration

  def change do
    create table(:transactions, primary_key: false) do
      add(:transaction_id, :uuid, null: false, primary_key: true)
      add(:bank_id, :string, null: false)
      add(:category_id, :string, null: true)
      add(:status, StatusEnum.type(), null: false)
      add(:concept, :string, null: false)
      add(:amount, :float, null: false)
      add(:date, :date, null: false)

      timestamps(type: :utc_datetime)
    end
  end

  def down do
    drop(table("transactions"))
  end
end
