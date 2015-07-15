json.extract! @group, :id, :title, :description, :zip_code, :created_at
json.groupEvents do
  json.array! @group.events do |event|
    json.merge! event.attributes
  end
end

json.members do
  json.array! @group.members do |member|
    json.merge! member.attributes
  end
end
