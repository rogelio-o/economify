defmodule Transactions.Repo.Migrations.AddIssuerToTransactions do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add(
        :issuer_id,
        references("issuers",
          type: :uuid,
          column: :issuer_id,
          on_delete: :restrict,
          on_update: :restrict
        ),
        null: false
      )
    end
  end
end
