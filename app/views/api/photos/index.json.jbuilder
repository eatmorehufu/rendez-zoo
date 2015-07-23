json.array! @group.photos do |photo|
  json.thumb_url asset_path(photo.pic.url(:medium))
  json.big_url asset_path(photo.pic.url(:original))
end
