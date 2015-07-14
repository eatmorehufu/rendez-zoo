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

require 'rails_helper'

RSpec.describe EventAttendance, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
