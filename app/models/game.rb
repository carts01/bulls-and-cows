class Game < ApplicationRecord

  # set up association - a game can only belong to one user
  belongs_to :user

  # Because false.blank? is equal to true, using presence won't work for false values
  # So we need to use inclusion instead to validate if the value is either true or false
  validates :win, inclusion: [true, false]
  validates :draw, inclusion: [true, false]
  validates :loss, inclusion: [true, false]
  validates :turns, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 7 }

end