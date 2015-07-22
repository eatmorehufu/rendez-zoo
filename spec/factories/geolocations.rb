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

FactoryGirl.define do
  factory :geolocation do
    
  end

end
