use Mix.Config

config :transactions, Transactions.Repo,
  database: "transactions_repo",
  username: "postgres",
  password: "postgres",
  hostname: "localhost"

config :transactions, ecto_repos: [Transactions.Repo]
