# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  start_time  :datetime         not null
#  end_time    :datetime
#  title       :string           not null
#  description :text             not null
#  group_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Event < ActiveRecord::Base
  validates :group_id, :start_time, :title, :description, presence: true

  belongs_to :group
  has_one :event_address
  has_many :event_attendances
  has_many :attendants, through: :event_attendances, source: :attendant
end
