defmodule Transactions.MixProject do
  use Mix.Project

  def project do
    [
      app: :transactions,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.8",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: {Transactions.Application, []}
    ]
  end

  defp deps do
    [
      {:poison, "~> 3.1"},
      {:ecto_sql, "~> 3.0"},
      {:postgrex, ">= 0.0.0"},
      {:scrivener_ecto, "~> 2.2.0"},
      {:ecto_enum, "~> 1.2"}
    ]
  end
end
