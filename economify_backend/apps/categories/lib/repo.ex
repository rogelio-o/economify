defmodule Categories.Repo do
  use Ecto.Repo,
    otp_app: :categories,
    adapter: Ecto.Adapters.Postgres

  use Scrivener, page_size: 5, max_page_size: 100
end
