class GamesController < ApplicationController

  before_action :set_game, only: [:show]

  def show
  end

  def index
    @games = Game.all
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to @game
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