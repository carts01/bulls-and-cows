class SessionsController < ApplicationController

  def new
  end

  def create
    # Look to see if the user exists by checking the email within the params against the User table
    user = User.find_by(email: params[:session][:email].downcase)
    if user
      # Attempt to authenticate the user by checking the password within the params against the User table
      if user.authenticate(params[:session][:password])
        # save the user id into the session
        session[:user_id] = user.id
        flash[:notice] = "Logged in successfully"
        redirect_to user_path(user)
      else
        flash.now[:alert] = "Incorrect password"
        render 'new'
      end
    else
      flash.now[:alert] = "A user with this email does not exist"
      render 'new'
    end
  end

  def destroy
    # Set the session equal to nil
    session[:user_id] = nil
    # Set the current user equal to nil
    @current_user = nil
    flash[:notice] = "You have been logged out"
    redirect_to root_path
  end

end