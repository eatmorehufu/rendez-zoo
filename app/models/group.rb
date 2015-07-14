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
  has_many :group_memberships, inverse_of: :group

  has_many :organizer_memberships,
    -> { where("status != 'member'")},
    class_name: "GroupMembership",
    foreign_key: :group_id

  has_many :members, through: :group_memberships, source: :member

  has_many :organizers, through: :organizer_memberships, source: :member
end
