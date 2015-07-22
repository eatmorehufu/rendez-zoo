# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
sennacy = User.create!(username: 'Sennacy', email: 'sennacy@cat.com', password: 'password', zip_code: "10003")
sennacy.set_geoloc("zip_code");
["Bear", "Otter", "Dolphin", "Giraffe", "Hyena", "Shark", "Merekat", "Flamingo"].each do |name|
  User.create!(username: name, email: name + "@" + name + "." + name, password: 'password')
end

def add_past_event(group, title, desc, loc_name, city, state)
  group.events.create!(
    title: title,
    description: desc,
    loc_name: loc_name,
    city: city,
    state: state,
    start_time: rand(5).weeks.ago
  )
end

def add_future_event(group, title, desc, loc_name, city, state)
  group.events.create!(
    title: title,
    description: desc,
    loc_name: loc_name,
    city: city,
    state: state,
    start_time: rand(5).weeks.from_now
  )
end


user = User.find_by(username: "Bear")
group = user.owned_groups.create!(
  title: "Urban Bears",
  description: "Come hang out with the bears in the city. Fun fur all.",
  zip_code: "10002"
)
GroupMembership.create!(group_id: group.id, member_id: user.id, status: "organizer")

event = add_past_event(group,
  "Fur Ball",
  "It's a big dance party!",
  "Central Park",
  "New York",
  "NY"
)
event.attendee_ids = [user.id]

user = User.find_by(username: "Otter")
group = user.owned_groups.create!(
  title: "Significant Otters of LA",
  description: "A meet and greet for otters and those who love them.",
  zip_code: "94101"
)

GroupMembership.create!(group_id: group.id, member_id: user.id, status: "organizer")

event = add_future_event(group,
  "Splish Splash",
  "Cool off in the water",
  "AT&T Park",
  "San Francisco",
  "California"
)

event.attendee_ids = [user.id]
