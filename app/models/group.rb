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
#  owner_id    :integer          not null
#

class Group < ActiveRecord::Base
  validates :title, :zip_code, :owner_id, presence: true

  has_many :events, dependent: :destroy
  has_many :group_memberships,
    -> { where("status = 'member'")},
    inverse_of: :group,
    dependent: :destroy

  has_many :organizer_memberships,
    -> { where("status = 'organizer'")},
    class_name: "GroupMembership",
    foreign_key: :group_id,
    dependent: :destroy

  has_many :members, through: :group_memberships, source: :member

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id

  has_many :organizers, through: :organizer_memberships, source: :member

end
