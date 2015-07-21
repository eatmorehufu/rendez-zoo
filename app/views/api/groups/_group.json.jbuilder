json.extract! group, :id, :city, :state, :title, :description, :owner_id, :zip_code, :created_at
json.totalMemberCount group.members.length + group.organizers.length
json.avatar_url asset_path(group.avatar.url(:medium))
