json.extract! user, :id, :username, :description, :zip_code, :created_at, :city, :state
json.avatar_url asset_path(user.avatar.url(:medium))
json.organizerGroups do
  json.array! user.organizer_groups.each do |group|
    json.partial! "/api/groups/group", group: group
  end
end
json.memberGroups do
  json.array! user.member_groups.each do |group|
    json.partial! "/api/groups/group", group: group
  end
end
json.interests do
  json.array! user.interests.each do |interest|
    json.extract! interest, :id, :name
  end
end
