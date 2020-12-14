require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest

  test "should get index" do
    get '/'
    assert_response :success
  end

  test "should get instructions" do
    get '/instructions'
    assert_response :success
  end

end