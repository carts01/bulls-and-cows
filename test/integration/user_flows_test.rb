require 'test_helper'

class UserFlowsTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  def setup
    @user = User.new(firstname: "Test", lastname: "User", username: "username", email: "test@example.com", password: "password")
  end

  test "can see the home page" do
    get "/"
    assert_select "h1", "This is the home page"
  end

  test "can create new user" do
    get "/users/new"
    assert_response :success

    post "/users", params: { user: { firstname: "Test", lastname: "User", username: "abcde", email: "abc@def.com", password: "password"} }
    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_select "p", "Test User"
  end

  test "can edit user" do 
    @user.save
    get "/users/1/edit"
    assert_response :success

    post "/users", params: { user: { firstname: "Test1", lastname: "User2", username: "abcde", email: "abc@def.com", password: "password"} }
    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_select "p", "Test1 User2"
  end

end
