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
  validates_format_of :email, with: /.+@.+\..+/i
  has_attached_file :avatar, :styles => { :medium => "240x240>", :thumb => "52x52>" }, :default_url => "/images/profile-missing.gif"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  has_many :sessions, dependent: :destroy
  has_one :user_detail

  has_many :group_memberships,
    -> { where("status = 'member'") },
    class_name: "GroupMembership",
    foreign_key: :member_id,
    dependent: :destroy

  has_many :organizer_memberships,
    -> {where("status = 'organizer'") },
    class_name: "GroupMembership",
    foreign_key: :member_id,
    dependent: :destroy

  has_many :event_attendances,
    class_name: "EventAttendance",
    foreign_key: :attendant_id,
    inverse_of: :attendee,
    dependent: :destroy

  has_many :events, through: :event_attendances, source: :event

  has_many :member_groups, through: :group_memberships, source: :group

  has_many :organizer_groups, through: :organizer_memberships, source: :group

  has_many :owned_groups,
    class_name: "Group",
    foreign_key: :owner_id

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
