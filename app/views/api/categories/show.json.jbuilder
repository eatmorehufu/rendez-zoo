json.extract! @category, :id, :name
json.associated_users do
  json.array! @category.users do |user|
    json.extract! user, :id, :username
  end
end
json.associated_groups do
  json.array! @category.groups do |group|
    json.extract! group, :id, :title, :zip_code
  end
end
