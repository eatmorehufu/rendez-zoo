# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string           not null
#  password_digest     :string           not null
#  username            :string           not null
#  created_at          :datetime
#  updated_at          :datetime
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  description         :text
#  zip_code            :string
#  latitude            :float
#  longitude           :float
#  city                :string
#  state               :string
#

describe "user" do
  it 'must have a username' do
    expect(FactoryGirl.build(:user, username: '')).to_not be_valid
  end

  it 'must have an email' do
    expect(FactoryGirl.build(:user, email: '')).to_not be_valid
  end

  it 'sets a password_digest based on a password' do
    user = User.new(username: "bob", email: "bob@bob.com", password: "sennacy")
    expect(user.password_digest.length).to be > 0
  end

  it 'must have a password longer than 6 characters' do
    expect(FactoryGirl.build(:user, password: '123')).to_not be_valid
  end

  it 'must have a properly formatted email address' do
    expect(FactoryGirl.build(:user, email:"bob")).to_not be_valid
  end

  describe 'has the proper group associations' do

    it 'owns groups that it creates' do
      user = User.create!(username: "bob", email: "bob@bob.com", password: "sennacy")
      group = user.owned_groups.create!(title: "group", description: "blah", zip_code: "12345")
      expect(user.owned_groups.count).to eq(1)
    end

    it 'adds owned groups to collection of organized groups' do
      user = User.create!(username: "bob", email: "bob@bob.com", password: "sennacy")
      group = user.owned_groups.create!(title: "group", description: "blah", zip_code: "12345")
      GroupMembership.create!(member_id: user.id, group_id: group.id, status: "organizer")
      expect(user.organizer_groups.count).to eq(1)
    end

    it 'counts non-organizer groups in group memberships' do
      user = User.create!(username: "bob", email: "bob@bob.com", password: "sennacy")
      group = user.owned_groups.create!(title: "group", description: "blah", zip_code: "12345")
      GroupMembership.create!(member_id: user.id, group_id: group.id, status: "organizer")
      user2 = User.create!(username:"joe", email: "joe@joe.com", password: "sennacy")
      GroupMembership.create!(member_id: user2.id, group_id: group.id, status: "member")
      expect(user2.organizer_groups.count).to eq(0)
      expect(user2.group_memberships.count).to eq(1)
    end

  end


end
