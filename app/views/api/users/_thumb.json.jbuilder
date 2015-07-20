json.extract! user, :id, :username, :created_at
json.avatar_url asset_path(user.avatar.url(:thumb))
