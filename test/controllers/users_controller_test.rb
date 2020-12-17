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
    get '/register'
    assert_response :success
  end

  test "should show user page" do
    get users_path(@user)
    assert_response :success
  end

  test "should create new user" do 
    assert_difference('User.count', 1) do 
      post users_path, params: { user: { firstname: "Test", lastname: "User", username: "abcde", email: "abc@def.com", password: "password"} }
    end

    assert_redirected_to user_path(User.last)
  end

end