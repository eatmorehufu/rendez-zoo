json.merge! @event.attributes

json.attendees do
  json.array! @event.attendees.each do |attendee|
    json.partial! "/api/users/thumb", user: attendee
  end
end
