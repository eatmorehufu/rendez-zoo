# == Schema Information
#
# Table name: event_addresses
#
#  id         :integer          not null, primary key
#  event_id   :integer          not null
#  street1    :string
#  street2    :string
#  city       :string
#  state      :string
#  zip_code   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :event_address do
    
  end

end
