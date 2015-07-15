# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user = User.create!(username: 'sennacy', email: 'sennacy@cat.com', password: 'password')
group = Group.create!(title: 'Pound Dawgs', description: "Ruff 'n' Tuff", owner_id: user.id, zip_code: "11111")
GroupMembership.create!(member_id: user.id, group_id: group.id, status: "organizer")
