defmodule Transactions.Repo.Migrations.AddLockCategoryToTransactions do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add(
        :category_locked,
        :boolean,
        default: false,
        null: false
      )
    end
  end
end
