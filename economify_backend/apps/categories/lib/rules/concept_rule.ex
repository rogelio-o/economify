defmodule Rules.ConceptRule do
  @behaviour Rules.Rule

  @impl Rules.Rule
  def check(transaction, params) do
    String.contains?(transaction.concept, Map.fetch(params, "concept"))
  end

end
