valid_zips = [
  "11375",
  "11101",
  "10003",
  "12345",
  "11580",
  "11364",
  "11234",
  "07032",
  "07031",
  "07079",
  "07083",
  "10457",
  "10461",
  "11554",
  "11530",
  "11756"
]

valid_streets = [
  "Park Ave",
  "Madison Ave",
  "Lexington Ave",
  "5th Ave",
  "1st Ave",
  "2nd Ave",
  "8th Ave",
  "Broadway"
]

["bears", "predators", "prey", "birds", "mammals", "sealife", "furry",
"otters", "cats", "giraffes", "fish", "mollusks", "migration", "hibernation",
"mating", "nesting", "rearing young", "salt lick", "scavenger", "symbiosis",
"budding", "reptiles", "tundra", "plains", "forest", "jungle", "ecosystem",
"food chain"].each do |category|
  Category.create!(name: category);
end

sennacy = User.create!(
  username: 'Sennacy',
  email: 'sennacy@cat.com',
  password: 'password',
  zip_code: "10003",
  avatar: "http://i.imgur.com/kjH1unY.jpg"
)
3.times do
  UserInterest.create!(user_id: sennacy.id, category_id: Category.ids.sample)
end

50.times do |i|
  animal = Faker::Team.creature.capitalize
  user = User.create!(
    username: Faker::Name.first_name + " " + animal,
    email: animal + i.to_s + "@" + animal + "." + animal,
    password: "password",
    zip_code: valid_zips.sample,
    description: "Hello! New to this site, I really love " + Faker::Team.creature + ".
    I'm originally from " + Faker::Address.country + " but I've migrated here
    for the summer.",
    avatar: File.new(File.join(Rails.root, "public", "images", "#{rand(18) + 1}.jpg"))
  )
  3.times do
    UserInterest.create!(user_id: user.id, category_id: Category.ids.sample)
  end
  sleep 0.3
end

50.times do
  animal = Faker::Team.name
  user = User.find(User.ids.sample)
  group = user.owned_groups.create!(
    title: animal + " of the " + Faker::Address.city_suffix.capitalize,
    description: Faker::Lorem.paragraphs(3),
    zip_code: valid_zips.sample,
    avatar: File.new(File.join(Rails.root, "public", "images", "#{rand(18) + 1}.jpg")),
    flair: animal
  )
  GroupMembership.create!(group_id: group.id, member_id: user.id, status: "organizer")

  3.times do
    GroupCategory.create!(group_id: group.id, category_id: Category.ids.sample)
  end
end

group = sennacy.owned_groups.create!(
  title: "Urban Bears",
  description: "Come hang out with the bears in the city. Fun fur all, and all fur fun.
  Our mission is to grow our community, attract tourism, and spotlight the individuals who make this forest great, while offering fun opportunities to connect socially, animalistically and more.",
  zip_code: "10002",
  flair: "bears"
)
GroupMembership.create!(group_id: group.id, member_id: sennacy.id, status: "organizer")
sleep 0.2

5.times do
  event = group.events.create!(
    start_time: rand(5).weeks.from_now,
    title: Faker::App.author + "'s " + Faker::App.name + "-a-thon!",
    description: Faker::Company.suffix + " of " + Faker::Team.creature + "
    enjoying the sun and fair weather. Come one, come all!",
    street1: ((rand(5) * 100) + (rand(5) * 10)).to_s + " " + valid_streets.sample,
    city: "New York",
    state: "NY"
  )
  10.times do
    attendant = User.ids.sample
    until !EventAttendance.find_by(event_id: event.id, attendant_id: attendant.id)
      attendant = User.ids.sample
    end
    EventAttendance.create!(event_id: event.id, attendant_id: attendant.id)
  end
end



group = sennacy.owned_groups.create!(
  title: "Polar Bear Club",
  description: "Cold enough for ya?

The Coney Island Polar Bear Club is the oldest winter bathing organization in the United States. We swim in the Atlantic Ocean at Coney Island every Sunday from November through April.



JOIN THE CONEY ISLAND POLAR BEAR CLUB AND CAMP SUNSHINE AT OUR ANNUAL NEW YEAR’S DAY SWIM

NEW YEAR’S DAY: Assemble on the Boardwalk at Stillwell Avenue, Coney Island.

SWIM TIME 1:00 PM SHARP, arrive early.

FREE ADMISSION TO NY HUMAN PENITENTIARY TO ALL REGISTERED ATTENDEES",
  zip_code: "11224",
  flair: "polar bears"
)
GroupMembership.create!(group_id: group.id, member_id: sennacy.id, status: "organizer")

sleep 0.2
group = sennacy.owned_groups.create!(
  title: "Significant Otters of LIC",
  description: "Welcome to The LIC 20's, 30's and 40's Singles Group. We are a fun group of young otters from the bay area who come together to meet and be merry, as well as make new friendships.

Our diverse events include: happy hour sea urchins, going to some of the hottest beaches as well as pubs/bars on the island, themed parties, sporting/recreational events, speed dating, and more!

We aim to be a caring and compassionate group where people will be respectful of each other despite different species, interests, values, and beliefs.  Come join us, and broaden your social horizon, as we seek to be the bridge to bring people together.",
  zip_code: "11101"
)

GroupMembership.create!(group_id: group.id, member_id: user.id, status: "organizer")
# event = add_future_event(group,
#   "Splish Splash",
#   "Bid bon voyage to the bar scene for a night and experience a new social experience on the river!
#
# Join 200+ singles & swim around the bay for a 4 hour tour & party! Mix, mingle & dance the night away.",
#   "Golden Gate Bridge",
#   "San Francisco",
#   "CA"
# )
#
# event.attendee_ids += [user.id]
