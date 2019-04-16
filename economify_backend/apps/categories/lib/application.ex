defmodule Categories.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      Categories.Repo
    ]

    opts = [strategy: :one_for_one, name: Categories.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
