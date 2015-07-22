# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Category < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true, length: { minimum: 3 }

  has_many :user_interests, inverse_of: :category
  has_many :group_categories, inverse_of: :category
  has_many :users, through: :user_interests, source: :user
  has_many :groups, through: :group_categories, source: :group
end
