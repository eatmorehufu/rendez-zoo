json.extract! user, :id, :username, :description, :zip_code
json.organizerGroups do
  json.array! user.organizer_groups.each do |group|
    json.merge! group.attributes
  end
end
json.memberGroups do
  json.array! user.member_groups.each do |group|
    json.merge! group.attributes
  end
end
