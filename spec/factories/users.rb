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
#  city                :string
#  state               :string
#

FactoryGirl.define do
  factory :user do
    email 'sennacy@cat.com'
    username 'sennacy'
    password_digest 'a bunch of digests'
  end
end
