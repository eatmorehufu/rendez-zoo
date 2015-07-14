# == Schema Information
#
# Table name: event_attendances
#
#  id           :integer          not null, primary key
#  attendant_id :integer          not null
#  event_id     :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryGirl.define do
  factory :event_attendance do
    
  end

end
