# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  start_time  :datetime         not null
#  end_time    :datetime
#  title       :string           not null
#  description :text             not null
#  group_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  street1     :string
#  street2     :string
#  city        :string
#  zip_code    :string
#  state       :string
#  loc_name    :string
#  latitude    :float
#  longitude   :float
#

FactoryGirl.define do
  factory :event do
    
  end

end
