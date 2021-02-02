class ApplicationController < ActionController::Base

  include SessionHelper

  helper_method :current_user, :logged_in?

end
