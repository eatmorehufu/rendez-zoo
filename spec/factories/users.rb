FactoryGirl.define do
  factory :user do
    email 'sennacy@cat.com'
    username 'sennacy'
    password_digest 'a bunch of digests'
  end
end
