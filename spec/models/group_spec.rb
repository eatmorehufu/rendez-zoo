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

require 'rails_helper'

RSpec.describe Group, type: :model do

let (:group) { Group.new(owner_id: 1, zip_code: "11111", title: "The Ones") }

  it "must have a title" do
    group.title = nil
    expect(group).to_not be_valid
  end

  it "must have an owner" do
    group.owner_id = nil
    expect(group).to_not be_valid
  end

  it "must have a zip code" do
    group.zip_code = nil
    expect(group).to_not be_valid
  end

  it "is valid when title, owner, and zip code are all present" do
    expect(group).to be_valid
  end
end
