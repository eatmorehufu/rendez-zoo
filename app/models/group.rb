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
#

class Group < ActiveRecord::Base
end
