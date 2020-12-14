require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(firstname: "Test", lastname: "User", username: "username", email: "test@example.com", password: "password")
  end

  test "user should be valid" do
    assert @user.valid?
  end

  test "firstname should be present" do
    @user.firstname = ""
    assert_not @user.valid?
  end

  test "lastname should be present" do
    @user.lastname = ""
    assert_not @user.valid?
  end

  test "username should be present" do
    @user.username = ""
    assert_not @user.valid?
  end

  test "username should be unique" do
    @user.save
    @user2 = User.new(firstname: "Test", lastname: "User", username: "username", email: "test@example.com", password: "password")
    assert_not @user2.valid?
  end

  test "username should be required length" do
    @user.username = "123"
    assert_not @user.valid?
  end

  test "email should be present" do
    @user.email = ""
    assert_not @user.valid?
  end

  test "email should be valid" do
    @user.email = "mixedup@email"
    assert_not @user.valid?
  end

end