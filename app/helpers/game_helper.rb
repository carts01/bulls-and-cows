module GameHelper

  def get_result(game)
   if game.win
    "Win"
   elsif game.draw
    "Draw"
   elsif game.loss
    "Loss"
   else
    "No Result"
   end
  end

  def get_wins(games)
    count = 0
    games.each do |game|
      count += 1 if game.win
    end
    count
  end

  def get_draws(games)
    count = 0
    games.each do |game|
      count += 1 if game.draw
    end
    count
  end

  def get_losses(games)
    count = 0
    games.each do |game|
      count += 1 if game.loss
    end
    count
  end

  def get_total_turns(games)
    count = 0
    games.each do |game|
      count += game.turns
    end
    count
  end

  def get_game_user(game)
    game.user.username
  end

end