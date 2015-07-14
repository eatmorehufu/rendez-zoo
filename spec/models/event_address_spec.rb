# == Schema Information
#
# Table name: event_addresses
#
#  id         :integer          not null, primary key
#  event_id   :integer          not null
#  street1    :string
#  street2    :string
#  city       :string
#  state      :string
#  zip_code   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe EventAddress, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
