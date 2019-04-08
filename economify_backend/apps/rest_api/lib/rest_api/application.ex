defmodule RestApi.Application do
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      RestApi.Endpoint
    ]

    opts = [strategy: :one_for_one, name: RestApi.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
