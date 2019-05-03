defmodule Rules.ConceptRule do
  @behaviour Rules.Rule

  @impl Rules.Rule
  def check(transaction, params) do
    String.contains?(String.downcase(transaction.concept), String.downcase(params["concept"]))
  end

end
