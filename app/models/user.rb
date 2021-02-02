class User < ApplicationRecord

  # Set up association - a user can have many games
  # If a user is deleted - all of their games will also be deleted
  has_many :games, dependent: :destroy

  before_save { self.email = email.downcase }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  INVALID_EMAIL_MESSAGE = "You must enter a valid email address"

  validates :firstname, presence: true, length: { maximum: 20 }
  validates :lastname, presence: true, length: { maximum: 20 }
  validates :username, presence: true, length: { minimum: 4, maximum: 20 }, uniqueness: { case_sensitive: false }
  validates :email, presence: true, length: { maximum: 90 }, uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX, message: INVALID_EMAIL_MESSAGE }

  has_secure_password
  
end