use Mix.Config

config :rest_api, RestApi.Endpoint,
  port: (System.get_env("PORT") || "4000") |> String.to_integer()
