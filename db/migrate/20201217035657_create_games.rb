class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.boolean :win, default: false
      t.boolean :draw, default: false
      t.boolean :loss, default: false
      t.integer :turns
      t.timestamps
    end
  end
end
