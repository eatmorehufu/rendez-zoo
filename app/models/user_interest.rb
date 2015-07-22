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

class UserInterest < ActiveRecord::Base
  validates :user_id, presence: true
  validates :category_id, presence: true

  belongs_to :user, inverse_of: :user_interests
  belongs_to :category, inverse_of: :user_interests
end
