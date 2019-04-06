defmodule EconomifyBackend.Repo do
  use Ecto.Repo,
    otp_app: :economify_backend,
    adapter: Ecto.Adapters.Postgres
end
