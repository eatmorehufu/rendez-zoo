json.merge! @event.attributes
json.attendees do
  json.array! @event.attendees.each do |attendee|
    json.partial! "/api/members/thumb", member: attendee
  end
end
