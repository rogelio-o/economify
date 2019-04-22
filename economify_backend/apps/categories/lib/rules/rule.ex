defmodule Rules.Rule do

  @callback check(Strut.t, Map.t) :: boolean()

  def get(rule) do
    case rule.type do
      :concept -> Rules.ConceptRule
      :issuer -> Rules.IssuerRule
    end
  end

end
