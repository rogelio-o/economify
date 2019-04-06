use Mix.Config

config :economify_backend, EconomifyBackend.Repo,
  database: "economify_backend_repo",
  username: "postgres",
  password: "postgres",
  hostname: "localhost"

config :economify_backend, ecto_repos: [EconomifyBackend.Repo]

config :economify_backend, EconomifyBackend.Endpoint,
  port: (System.get_env("PORT") || "4000") |> String.to_integer()
