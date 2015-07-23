# == Schema Information
#
# Table name: photos
#
#  id               :integer          not null, primary key
#  imagable_id      :integer
#  imagable_type    :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  pic_file_name    :string
#  pic_content_type :string
#  pic_file_size    :integer
#  pic_updated_at   :datetime
#

class Photo < ActiveRecord::Base
  attr_accessor :pic
  has_attached_file :pic, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :pic, :content_type => /\Aimage\/.*\Z/

  belongs_to :imagable, polymorphic: true
end
