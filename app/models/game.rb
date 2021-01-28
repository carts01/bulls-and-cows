class Game < ApplicationRecord

  # set up association - a game can only belong to one user
  belongs_to :user

  # Use regex to ensure that user and comp codes are only digits
  VALID_CODE_REGEX = /\d{4}/
  INVALID_CODE_MESSAGE = "The code must be four unique digits - game failed to save"

  # Because false.blank? is equal to true, using presence won't work for false values
  # So we need to use inclusion instead to validate if the value is either true or false
  validates :win, inclusion: [true, false]
  validates :draw, inclusion: [true, false]
  validates :loss, inclusion: [true, false]
  validates :turns, presence: true, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 7 }
  validates :level, presence: true, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 3 }
  # validates :user_code, presence: true, length: 4, format: { with: VALID_CODE_REGEX, message: INVALID_CODE_MESSAGE }
  # validates :comp_code, presence: true, length: 4, format: { with: VALID_CODE_REGEX, message: INVALID_CODE_MESSAGE }

end