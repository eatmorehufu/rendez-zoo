# == Schema Information
#
# Table name: group_memberships
#
#  id         :integer          not null, primary key
#  member_id  :integer          not null
#  group_id   :integer          not null
#  status     :string           default("member"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe GroupMembership, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
