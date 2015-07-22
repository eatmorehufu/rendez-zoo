# == Schema Information
#
# Table name: group_categories
#
#  id          :integer          not null, primary key
#  group_id    :integer          not null
#  category_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe GroupCategory, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
