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
#  latitude            :float
#  longitude           :float
#  city                :string
#  state               :string
#  slug                :string           not null
#  flair               :string           default("member"), not null
#

FactoryGirl.define do
  factory :group do
    
  end

end
