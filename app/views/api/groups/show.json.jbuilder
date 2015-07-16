json.partial! "group", group: @group
json.groupEvents do
  json.array! @group.events do |event|
    json.merge! event.attributes
  end
end

json.members do
  json.array! @group.members do |member|
    json.partial! "/api/members/thumb", member: member
  end
end

json.organizers do
  json.array! @group.organizers do |organizer|
    json.partial! "/api/members/thumb", member: organizer
  end
end
