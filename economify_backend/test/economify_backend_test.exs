defmodule EconomifyBackendTest do
  use ExUnit.Case
  doctest EconomifyBackend

  test "greets the world" do
    assert EconomifyBackend.hello() == :world
  end
end
