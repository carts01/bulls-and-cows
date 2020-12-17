require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = User.new(firstname: "Test", lastname: "User", username: "username", email: "test@example.com", password: "password")
  end

  test "should get login page" do 
    get "/login"
    assert_response :success
  end

  test "should login user" do
    @user.save
    post login_path params: { session: { email: @user.email, password: @user.password } }
    assert_redirected_to user_path(@user)
  end

end