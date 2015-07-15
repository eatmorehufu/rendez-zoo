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


describe "user" do
  it 'must have a username' do
    expect(FactoryGirl.build(:user, username: '')).to_not be_valid
  end

  it 'must have an email' do
    expect(FactoryGirl.build(:user, email: '')).to_not be_valid
  end

  it 'sets a password_digest based on a password' do
    user = User.new(username: "bob", email: "bob@bob", password: "sennacy")
    expect(user.password_digest.length).to be > 0
  end

end
