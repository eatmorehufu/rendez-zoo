json.results do
  json.array! @search_results do |search_result|
    if @search_type == "Group"
      json.partial! "/api/groups/group", group: search_result
      json._type "Group"
    else
      json.partial! "/api/events/show", event: search_result
      json._type "Event"
    end
  end
end
