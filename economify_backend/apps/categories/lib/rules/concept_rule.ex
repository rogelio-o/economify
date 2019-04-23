defmodule Rules.ConceptRule do
  @behaviour Rules.Rule

  @impl Rules.Rule
  def check(transaction, params) do
    String.contains?(String.downcase(transaction.concept), String.downcase(Map.fetch(params, "concept")))
  end

end
