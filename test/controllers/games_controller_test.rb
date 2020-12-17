require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

  def setup
    @game = Game.new(win: false, draw: true, loss: false, turns: 7, user_id: 1)
  end

  test "should get index" do
    get "/games"
    assert_response :success
  end

  test "should get new game" do 
    get "/games/new"
    assert_response :success
  end

  test "should show single game page" do 
    get games_path(@game)
    assert_response :success
  end

  test "should create new game" do 
    assert_difference('Game.count', 1) do
      post games_path, params: { game: { win: true, draw: false, loss: false, turns: 4, user_id: 2 } }
    end
    assert_redirected_to game_path(Game.last)
  end

end
