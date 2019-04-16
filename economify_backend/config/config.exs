use Mix.Config

config :rest_api, RestApi.Endpoint,
  port: (System.get_env("PORT") || "4000") |> String.to_integer()

config :transactions, Transactions.Repo,
  database: "transactions_repo",
  username: "postgres",
  password: "postgres",
  hostname: "localhost"

config :transactions, ecto_repos: [Transactions.Repo]

config :banks, Banks.Repo,
  database: "banks_repo",
  username: "postgres",
  password: "postgres",
  hostname: "localhost"

config :banks, ecto_repos: [Banks.Repo]

config :categories, Categories.Repo,
  database: "categories_repo",
  username: "postgres",
  password: "postgres",
  hostname: "localhost"

config :categories, ecto_repos: [Categories.Repo]
