defmodule EconomifyBackend.Repo.Migrations.CreateTransactions do
  use Ecto.Migration

  def change do
    create table(:transactions) do
      add :transaction_id, :binary, null: false, primary_key: true
      add :bank_id, :binary, null: false
      add :category_id, :binary, null: false
      add :concept, :string, null: false
      add :amount, :float, null: false
      add :date, :date, null: false
      add :inserted_at, :utc_datetime, default: fragment("now()")
      add :updated_at, :utc_datetime, default: fragment("now()")
    end
  end
end
