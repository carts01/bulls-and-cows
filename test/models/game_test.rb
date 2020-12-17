require 'test_helper'

class GameTest < ActiveSupport::TestCase

  def setup
    @user = User.new(firstname: "Test", lastname: "User", username: "username", email: "test@example.com", password: "password")
    @user.save
    @game = Game.new(win: true, draw: false, loss: false, turns: 5, user_id: @user.id)
  end

  test "game should be valid" do
    assert @game.valid?, @game.errors.messages
  end

  test "win value should be boolean" do 
    @game.win = nil
    assert_not @game.valid?
  end

  test "turns should be integer value" do
    @game.turns = "not a number"
    assert_not @game.valid?
  end

  test "turns should be higher than 0" do 
    @game.turns = 0
    assert_not @game.valid?
  end

  test "turns should be no higher than 7" do
    @game.turns = 8
    assert_not @game.valid?
  end

end