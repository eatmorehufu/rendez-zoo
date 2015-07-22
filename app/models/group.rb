# == Schema Information
#
# Table name: groups
#
#  id                  :integer          not null, primary key
#  title               :string           not null
#  description         :text
#  zip_code            :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  owner_id            :integer          not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class Group < ActiveRecord::Base
  validates :title, :zip_code, :owner_id, presence: true
  validates :zip_code, format: { with: /\A[0-9]{5}\z/ }
  has_attached_file :avatar, :styles => { :medium => "311x184>", :thumb => "100x100>" }, :default_url => "/images/group-missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

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

  has_many :group_categories, inverse_of: :group
  has_many :categories, through: :group_categories, source: :category

  geocoded_by :zip_code
  reverse_geocoded_by :latitude, :longitude do |obj, results|
    if (geo = results.first)
      obj.city = geo.city
      obj.state = geo.state_code
    end
  end
  after_validation :geocode, :reverse_geocode
end
