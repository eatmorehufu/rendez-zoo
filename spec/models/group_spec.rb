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

  describe "user associations" do

    it "has an owner" do
      user = User.create!(username: "bob", email: "bob@bob.com", password: "sennacy")
      group = user.owned_groups.create!(title: "group", description: "blah", zip_code: "12345")
      expect(group.owner).to eq(user)
    end

    it "counts an owner as an organizer" do
      user = User.create!(username: "bob", email: "bob@bob.com", password: "sennacy")
      group = user.owned_groups.create!(title: "group", description: "blah", zip_code: "12345")
      GroupMembership.create!(member_id: user.id, group_id: group.id, status: "organizer")
      expect(group.organizers.count).to eq(1)
    end

    it "does not count an owner as a mere member" do
      user = User.create!(username: "bob", email: "bob@bob.com", password: "sennacy")
      group = user.owned_groups.create!(title: "group", description: "blah", zip_code: "12345")
      GroupMembership.create!(member_id: user.id, group_id: group.id, status: "organizer")
      expect(group.members.count).to eq(0)
    end
  end
end
