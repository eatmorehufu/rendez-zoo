# == Schema Information
#
# Table name: groups
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text
#  zip_code    :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Group < ActiveRecord::Base
  validates :title, :zip_code, presence: true

  has_many :events
  has_many :group_memberships
  has_many :members, through: :group_memberships, source: :member
  
end
