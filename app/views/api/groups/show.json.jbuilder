json.partial! "group", group: @group

json.categories do
  json.array! @group.categories do |category|
    json.extract! category, :id, :name
  end
end

json.groupEvents do
  json.array! @group.events do |event|
    json.merge! event.attributes
    json.attendees do
      json.array! event.attendees do |attendee|
        json.partial! "/api/users/thumb", user: attendee
      end
    end
  end
end

json.members do
  json.array! @group.members do |member|
    json.partial! "/api/users/thumb", user: member
    json.joined_at @group.group_memberships.find_by(member_id: member.id).created_at
  end
end

json.organizers do
  json.array! @group.organizers do |organizer|
    json.partial! "/api/users/thumb", user: organizer
    json.joined_at @group.organizer_memberships.find_by(member_id: organizer.id).created_at
  end
end
