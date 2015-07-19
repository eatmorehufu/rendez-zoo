json.extract! group, :id, :title, :description, :owner_id, :zip_code, :created_at
json.avatar_url asset_path(group.avatar.url(:medium))
