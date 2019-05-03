defmodule Rules.IssuerRule do
  @behaviour Rules.Rule

  @impl Rules.Rule
  def check(transaction, params) do
    transaction.issuer_id === params["issuer_id"]
  end

end
