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
#  loc_name    :string
#  latitude    :float
#  longitude   :float
#

require 'rails_helper'

RSpec.describe Event, type: :model do

  let(:event) {Event.new(
    start_time: "12345",
    title: "event",
    description: "event",
    group_id: 1
  )}

  it "must have a start time" do
    event.start_time = nil
    expect(event).to_not be_valid
  end

  it "must have a title" do
    event.title = nil
    expect(event).to_not be_valid
  end

  it "must have a description" do
    event.description = nil
    expect(event).to_not be_valid
  end

  it "must belong to a group" do
    event.group_id = nil
    expect(event).to_not be_valid
  end
  
end
