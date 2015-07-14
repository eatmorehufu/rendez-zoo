# == Schema Information
#
# Table name: sessions
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  session_token :string           not null
#  created_at    :datetime
#  updated_at    :datetime
#

class Session < ActiveRecord::Base
  validates :user_id, :session_token, presence: true
  validates :session_token, uniqueness: true
  after_initialize :set_token

  belongs_to :user

  def self.generate_token
    SecureRandom::urlsafe_base64(16)
  end

  private

  def set_token
    self.session_token = self.class.generate_token
  end

end
