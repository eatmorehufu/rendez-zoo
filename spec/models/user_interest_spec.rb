# == Schema Information
#
# Table name: user_interests
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  category_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe UserInterest, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
