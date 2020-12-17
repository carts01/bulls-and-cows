class AddUserToGames < ActiveRecord::Migration[6.0]
  def change
    add_reference :games, :user
  end
end
