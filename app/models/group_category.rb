class GroupCategory < ActiveRecord::Base
  validates :category_id, presence: true
  validates :group_id, presence: true

  belongs_to :category, inverse_of: :group_categories
  belongs_to :group, inverse_of: :group_categories
end
