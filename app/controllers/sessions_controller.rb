class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if user.present?
      redirect_to groups_url
    else
      flash.now[:errors] = "Couldn't find user."
      render :new
    end

  end

  def destroy

  end

end
