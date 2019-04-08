use Mix.Config

config :rest_api, RestApi.Endpoint,
  port: (System.get_env("PORT") || "4000") |> String.to_integer()

config :transactions, Transactions.Repo,
  database: "transactions_repo",
  username: "postgres",
  password: "postgres",
  hostname: "localhost"

config :transactions, ecto_repos: [Transactions.Repo]
