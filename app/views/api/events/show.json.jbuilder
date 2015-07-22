json.merge! @event.attributes
json.location do
  json.merge! @event.location.attributes
end
json.attendees do
  json.array! @event.attendees.each do |attendee|
    json.partial! "/api/users/thumb", user: attendee
  end
end
