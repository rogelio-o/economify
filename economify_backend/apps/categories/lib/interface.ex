defmodule Categories.Interface do
  defdelegate create_category(params), to: Categories.Service, as: :create
  defdelegate update_category(category_id, params), to: Categories.Service, as: :update
  defdelegate delete_category(category_id), to: Categories.Service, as: :delete

  defdelegate get_categories_all_paginated(page, page_size),
    to: Categories.Service,
    as: :get_all_paginated

  defdelegate get_category_by_id(category_id), to: Categories.Service, as: :get_by_id

  defdelegate create_rule(params), to: Rules.Service, as: :create
  defdelegate update_rule(rule_id, params), to: Rules.Service, as: :update
  defdelegate delete_rule(rule_id), to: Rules.Service, as: :delete

  defdelegate get_rules_all_paginated(page, page_size),
    to: Rules.Service,
    as: :get_all_paginated

  defdelegate get_rule_by_id(rule_id), to: Rules.Service, as: :get_by_id
end
