defmodule Banks.Repo do
  use Ecto.Repo,
    otp_app: :banks,
    adapter: Ecto.Adapters.Postgres

  use Scrivener, page_size: 5, max_page_size: 100
end
