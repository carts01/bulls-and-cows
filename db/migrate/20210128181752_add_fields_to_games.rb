class AddFieldsToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :level, :integer
    add_column :games, :user_code, :string
    add_column :games, :comp_code, :string
  end
end
