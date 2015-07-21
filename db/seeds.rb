# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(username: 'Sennacy', email: 'sennacy@cat.com', password: 'password')
["Bear", "Otter", "Dolphin", "Giraffe", "Hyena", "Shark", "Merekat", "Flamingo"].each do |name|
  User.create!(username: name, email: name + "@" + name + "." + name, password: 'password')
end
