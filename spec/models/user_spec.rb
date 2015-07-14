
describe "user" do
  it 'errors when no username is given' do
    expect(FactoryGirl.build(:user, username: '')).to_not be_valid
  end

  it 'errors when no email is given' do
    expect(FactoryGirl.build(:user, email: '')).to_not be_valid
  end

  it 'sets a password_digest based on a password' do
    user = User.new(username: "bob", email: "bob@bob", password: "sennacy")
    expect(user.password_digest.length).to be > 0
  end

end
