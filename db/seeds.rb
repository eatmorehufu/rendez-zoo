# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

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

sennacy = User.create!(username: 'Sennacy', email: 'sennacy@cat.com', password: 'password', zip_code: "10003")
["Bear", "Polar Bear", "Otter", "Dolphin", "Giraffe", "Hyena", "Shark", "Meerkat", "Flamingo"].each do |name|
  user = User.create!(username: name, email: name + "@" + name + "." + name, password: 'password', zip_code: (rand(20) + 94101).to_s)
  sleep 0.3
  3.times do
    group = user.owned_groups.create!(title: Faker::Team.name, description: Faker::Lorem.paragraph(3), zip_code: user.zip_code)
    sleep 0.2
    GroupMembership.create!(group_id: group.id, member_id: user.id, status: "organizer")
  end
  # , avatar: File.new('/Users/huesq/Desktop/rendez-zoo-project-proposal/public/images/' + name + '.jpg'
end

user = User.find_by(username: "Bear")
group = user.owned_groups.create!(
  title: "Urban Bears",
  description: "Come hang out with the bears in the city. Fun fur all.",
  zip_code: "10002"
)
GroupMembership.create!(group_id: group.id, member_id: user.id, status: "organizer")
sleep 0.2
group = user.owned_groups.create!(
  title: "Polar Bear Club",
  description: "Cold enough for ya?

The Coney Island Polar Bear Club is the oldest winter bathing organization in the United States. We swim in the Atlantic Ocean at Coney Island every Sunday from November through April.



JOIN THE CONEY ISLAND POLAR BEAR CLUB AND CAMP SUNSHINE AT OUR ANNUAL NEW YEAR’S DAY SWIM

NEW YEAR’S DAY: Assemble on the Boardwalk at Stillwell Avenue, Coney Island.

SWIM TIME 1:00 PM SHARP, arrive early.

FREE ADMISSION TO NY HUMAN PENITENTIARY TO ALL REGISTERED ATTENDEES",
  zip_code: "11224"
)
GroupMembership.create!(group_id: group.id, member_id: user.id, status: "organizer")
sleep 0.2
event = add_past_event(group,
  "Fur Ball",
  "The Furball is a NYC based danceparty & celebration of everything furry & fuzzy.",
  "Central Park",
  "New York",
  "NY"
)
event.attendee_ids += [user.id]
sleep 0.2
user = User.find_by(username: "Otter")
group = user.owned_groups.create!(
  title: "Significant Otters of SF",
  description: "Welcome to The SF 20's, 30's and 40's Singles Group. We are a fun group of young otters from the bay area who come together to meet and be merry, as well as make new friendships.

Our diverse events include: happy hour sea urchins, going to some of the hottest beaches as well as pubs/bars in the bay, themed parties, sporting/recreational events, speed dating, and more!

We aim to be a caring and compassionate group where people will be respectful of each other despite different species, interests, values, and beliefs.  Come join us, and broaden your social horizon, as we seek to be the bridge to bring people together.",
  zip_code: "94110"
)

GroupMembership.create!(group_id: group.id, member_id: user.id, status: "organizer")
sleep 0.2
event = add_future_event(group,
  "Splish Splash",
  "Bid bon voyage to the bar scene for a night and experience a new social experience on the river!

Join 200+ singles & swim around the bay for a 4 hour tour & party! Mix, mingle & dance the night away.",
  "Golden Gate Bridge",
  "San Francisco",
  "CA"
)

event.attendee_ids += [user.id]

15.times do
  user = User.create!(username: Faker::Name.name, email: Faker::Internet.email, password: "password", zip_code: (rand(98) + 94101).to_s)
  sleep 0.3
  #, avatar: File.new("/Users/huesq/Desktop/rendez-zoo-project-proposal/public/images/" + (rand(13) + 1).to_s + ".jpg"
  GroupMembership.create!(group_id: group.id, member_id: user.id)
end
