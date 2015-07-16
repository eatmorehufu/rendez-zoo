json.extract! current_user, :id, :username
json.organizerGroups do
  json.array! current_user.organizer_groups.each do |group|
    json.merge! group.attributes
  end
end
json.memberGroups do
  json.array! current_user.member_groups.each do |group|
    json.merge! group.attributes
  end
end
