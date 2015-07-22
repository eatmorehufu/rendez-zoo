# == Schema Information
#
# Table name: user_interests
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  category_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :user_interest do
    
  end

end
