defmodule RestApi.Transactions.Statistics.Router do
  use Plug.Router
  import RoutersUtils

  plug(:match)
  plug(:dispatch)

  get "/category/:year" do
    {year, _} = Integer.parse(conn.path_params["year"])
    Transactions.Interface.statistics_by_category(year)
      |> send_as_json(200, conn)
  end

end
