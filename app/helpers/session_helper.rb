module SessionHelper

  def current_user
    # Finds the User with the ID stored in the session (or set it to default)
    @current_user ||= session[:user_id] &&
    User.find_by(id: session[:user_id])
  end

  def logged_in?
    # Return true if current user exists, false otherwise
    !!current_user
  end

  def require_user
    if !logged_in?
      flash[:alert] = "You must be logged in to perform this action"
      redirect_to login_path
    end
  end

end