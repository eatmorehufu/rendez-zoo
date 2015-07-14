class GroupMembership < ActiveRecord::Base
  validates :member_id, :group_id, :status, presence: true
  validates :member_id, uniqueness: { scope: :group_id }

  belongs_to :member,
    class_name: "User",
    foreign_key: :member_id,
    primary_key: :id

  belongs_to :group
end
