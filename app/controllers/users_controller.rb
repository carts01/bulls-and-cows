class UsersController < ApplicationController

  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :require_user, only: [:edit, :update, :destroy]
  before_action :require_same_user, only: [:edit, :update, :destroy]

  def index
    # @users = User.all
    # Show 20 users per page and then paginate
    @users = User.paginate(:page => params[:page], :per_page => 20)
    @sorted_users = @users.sort_by { |user| -user.games.count }
  end

  def show
    # @games = @user.games
    # Show 20 game results per page and then paginate
    @games = @user.games.paginate(page: params[:page], per_page: 120)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      # Log in newly created user
      session[:user_id] = @user.id
      flash[:notice] = "Welcome #{@user.username}!"
      redirect_to @user
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    # delete user and set session to be equal to nil
    @user.destroy
    session[:user_id] = nil unless @user != current_user
    flash[:notice] = "Account deleted"
    redirect_to root_path
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:firstname, :lastname, :username, :email, :password)
  end

  def require_same_user
    if current_user != @user && !current_user.admin?
      flash[:alert] = "You can only edit or delete your own profile"
      redirect_to @user
    end
  end

end