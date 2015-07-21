class UserInterest < ActiveRecord::Base
  validates :user_id, presence: true
  validates :category_id, presence: true

  belongs_to :user, inverse_of: :user_interests
  belongs_to :category, inverse_of: :user_interests
end
