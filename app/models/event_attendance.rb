# == Schema Information
#
# Table name: event_attendances
#
#  id           :integer          not null, primary key
#  attendant_id :integer          not null
#  event_id     :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class EventAttendance < ActiveRecord::Base
  validates :attendant_id, :event_id, presence: true
  validates :attendant_id, uniqueness: { scope: :event_id }

  belongs_to :attendant,
    class_name: "User",
    foreign_key: :attendant_id,
    primary_key: :id

  belongs_to :event
end
