# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  username        :string           not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates :email, :password_digest, :username, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true}

  has_many :sessions
  has_one :user_detail

  has_many :group_memberships,
    -> { where "status != 'owner'" },
    class_name: "GroupMembership",
    foreign_key: :member_id

  has_many :group_ownerships,
    -> { where status: "owner" },
    class_name: "GroupMembership",
    foreign_key: :member_id

  has_many :event_attendances
  has_many :events, through: :event_attendances, source: :event

  has_many :member_groups, through: :group_memberships, source: :group
  has_many :owned_groups, through: :group_ownerships, source: :group

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user.try(:is_password?, password) ? user : nil
  end

  def password=(password)
    if password.present?
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

end
