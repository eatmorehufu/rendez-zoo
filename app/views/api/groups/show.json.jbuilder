json.partial! "group", group: @group
json.categories do
  json.array! @group.categories do |category|
    json.extract! category, :id, :name
  end
end
json.groupEvents do
  json.array! @group.events do |event|
    json.merge! event.attributes
  end
end

json.members do
  json.array! @group.members do |member|
    json.partial! "/api/users/thumb", user: member
  end
end

json.organizers do
  json.array! @group.organizers do |organizer|
    json.partial! "/api/users/thumb", user: organizer
  end
end
