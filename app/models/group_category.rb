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

class GroupCategory < ActiveRecord::Base
  validates :category_id, presence: true
  validates :group_id, presence: true

  belongs_to :category, inverse_of: :group_categories
  belongs_to :group, inverse_of: :group_categories
end
