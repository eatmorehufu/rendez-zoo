# == Schema Information
#
# Table name: geolocations
#
#  id             :integer          not null, primary key
#  locatable_id   :integer          not null
#  locatable_type :string           not null
#  lat            :float            not null
#  lng            :float            not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  city           :string           not null
#  state          :string           not null
#

class Geolocation < ActiveRecord::Base
  validates :lat, :lng, :locatable_id, :locatable_type, presence: true
  belongs_to :locatable, polymorphic: true
end
