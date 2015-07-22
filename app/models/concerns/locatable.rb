require 'addressable/uri'
require 'rest-client'

module Locatable
  extend ActiveSupport::Concern

  included do
    has_one :location,
      class_name: "Geolocation",
      as: :locatable
  end

  def set_geoloc(*loc_search_terms)
    address_components = []
    loc_search_terms.each do |term|
      address_components.push(self.send(term.to_sym))
    end
    address = address_components.join(" ")
    url = Addressable::URI.new(
      scheme: 'https',
      host: 'maps.googleapis.com',
      path: 'maps/api/geocode/json',
      query_values: {
        address: address
      }
    ).to_s


    resp = RestClient.get(url)
    parse = JSON.parse(resp)
    coords = parse["results"].first["geometry"]["location"]


    if self.location.nil?
      self.create_location!(lat: coords["lat"], lng: coords["lng"])
    else
      self.location.lat = coords["lat"]
      self.location.lng = coords["lng"]
      self.location.save!
    end

    return nil
  end


end
