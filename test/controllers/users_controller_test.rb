require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = User.new(firstname: "Test", lastname: "User", username: "username", email: "test@example.com", password: "password")
  end

  test "should get index" do
    get '/users'
    assert_response :success
  end

  test "should get new user page" do
    get new_user_path
    assert_response :success
  end

  test "should show user page" do
    get users_path(@user)
    assert_response :success
  end

end