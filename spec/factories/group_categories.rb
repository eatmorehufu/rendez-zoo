# == Schema Information
#
# Table name: group_categories
#
#  id          :integer          not null, primary key
#  group_id    :integer          not null
#  category_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :group_category do
    
  end

end
