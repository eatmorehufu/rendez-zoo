json.merge! group.attributes
json.totalMemberCount group.members.length + group.organizers.length
json.avatar_url asset_path(group.avatar.url(:medium))
