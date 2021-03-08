# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

firstnames = ["John", "Jack", "Laura"]
lastnames = ["Doe", "Fox", "Turner"]
usernames = ["jdoe", "foxy", "lt13"]
emails = ["jdoe@example.com", "fox@test.com", "lauraturner@noreply.com"]

3.times do |i|
  User.create(firstname: firstnames[i], lastname: lastnames[i], username: usernames[i], email: emails[i], password_digest: "password", admin: false)
end