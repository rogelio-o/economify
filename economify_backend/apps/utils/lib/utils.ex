defmodule Utils do
  def parse_result(result) do
    case result do
      {:ok, transaction} ->
        {:ok, transaction}

      {:error, changeset} ->
        {:form_error, translate_errors(changeset)}
    end
  end

  defp translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  defp translate_error({msg, opts}) do
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
    end)
  end
end
