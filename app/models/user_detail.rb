# == Schema Information
#
# Table name: user_details
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  description :text
#  zip_code    :string
#  avatar_url  :string
#  created_at  :datetime
#  updated_at  :datetime
#

class UserDetail < ActiveRecord::Base
  validates :user_id, presence: true

  belongs_to :user
end
