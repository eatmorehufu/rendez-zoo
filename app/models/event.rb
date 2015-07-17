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
#  street1     :string
#  street2     :string
#  city        :string
#  zip_code    :string
#  state       :string
#

class Event < ActiveRecord::Base
  validates :group_id, :start_time, :title, :description, presence: true
  validate :future_start_time
  validate :start_time_limit
  validate :end_time_limit
  belongs_to :group
  has_many :event_attendances, dependent: :destroy, inverse_of: :event
  has_many :attendees, through: :event_attendances, source: :attendee
  after_initialize :parse_time

  def start_timepick=(timepick)
    @start_timepick = timepick[0...-2] + " " + timepick[-2..-1]
  end

  def start_day=(day)
    @start_day = day
  end

  def end_timepick=(timepick)
    @end_timepick = timepick[0...-2] + " " + timepick[-2..-1]
  end

  def end_day=(day)
    @end_day = day
  end

  private

  def parse_time
    if @start_day && @start_timepick
      #"07/30/2015 2:00am"
      starting_time = @start_day + "-" + @start_timepick
      self.start_time = DateTime.strptime(starting_time, "%m/%d/%Y-%H:%M %p")
    end

    if @end_timepick && @end_day
      ending_time = @end_day + "-" + @end_timepick
      self.end_time = DateTime.strptime(ending_time, "%m/%d/%Y-%H:%M %p")
    end

  end

  def future_start_time
    if (self.created_at && self.created_at > self.start_time) ||
      (!self.created_at && Time.now > self.start_time)
      errors.add(:start_time, "can't be in the past.")
    end
  end

  def start_time_limit
    if self.start_time > 1.year.from_now
      errors.add(:start_time, "must be within a year of now")
    end
  end

  def end_time_limit
    if self.end_time && (self.start_time + 1.week == self.end_time)
      errors.add(:end_time, "must be within a week of the starting time")
    end
  end

end
