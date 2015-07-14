class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :current_sesh, :logged_in?

  def login!(user)
    @current_user = user
    session[:session_token] = Session.create!(user_id: user.id).session_token
  end

  def current_user
    return nil if current_sesh.nil?
    @current_user ||= current_sesh.user
  end

  def logout!(sesh_id)
    session[:session_token] = nil if current_sesh.id == sesh_id
    Session.find(sesh_id).destroy!
  end

  def current_sesh
    current_session = Session.find_by(session_token: session[:session_token])
    return nil if current_session.nil?
    @current_sesh ||= current_session
  end

  def logged_in?
    !!current_user
  end
end
