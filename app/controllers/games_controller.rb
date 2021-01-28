class GamesController < ApplicationController

  before_action :set_game, only: [:show]
  # before_action :require_user, except: [:show, :index]

  def show
  end

  def index
    @games = Game.all
    @wins = Game.where(win: true)
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)
    # set game.user to be equal to the current user (from the Session ID)
    @game.user = current_user
    if @game.save
      flash[:notice] = "Game saved!"
      redirect_to @game.user
    else
      render 'new'
    end
  end

  private

  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:win, :draw, :loss, :turns, :user_id)
  end

end