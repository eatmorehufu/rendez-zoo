# == Schema Information
#
# Table name: album_photos
#
#  id                 :integer          not null, primary key
#  imagable_id        :integer
#  imagable_type      :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  photo_file_name    :string
#  photo_content_type :string
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#

FactoryGirl.define do
  factory :album_photo do
    
  end

end
