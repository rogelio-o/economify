defmodule BanksTest do
  use ExUnit.Case
  doctest Banks

  test "greets the world" do
    assert Banks.hello() == :world
  end
end
