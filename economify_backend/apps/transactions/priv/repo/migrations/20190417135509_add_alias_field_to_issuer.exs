defmodule Transactions.Repo.Migrations.AddAliasFieldToIssuer do
  use Ecto.Migration

  def change do
    alter table(:issuers) do
      add(
        :alias,
        {:array, :string}
      )
    end
  end
end
