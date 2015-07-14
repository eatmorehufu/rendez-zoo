class User < ActiveRecord::Base
  validates :email, :password_digest, :username, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true}
  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user.try(:is_password?, password) ? user : nil
  end

  def password=(password)
    if password.present?
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
  end

  def is_password(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!

  end

  private

  def ensure_session_token

  end

end
