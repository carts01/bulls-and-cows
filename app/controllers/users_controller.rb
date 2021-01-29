class UsersController < ApplicationController

  before_action :set_user, only: [:show, :edit, :update]

  def index
    # @users = User.all
    # Show 20 users per page and then paginate
    @users = User.paginate(:page => params[:page], :per_page => 20)
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

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:firstname, :lastname, :username, :email, :password)
  end

end