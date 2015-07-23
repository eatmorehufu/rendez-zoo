module Api
  class SessionsController < ApplicationController

    def show
      if logged_in?
        render :show
      else
        render json: {}
      end
    end

    def create
      user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
      )

      if user.nil?
        head :unprocessable_entity
      else
        login!(user)
        render :show
      end
    end

    def destroy
      logout!(current_sesh.id)
      render json: {}
    end
    
    def omniauth
      # do something with the auth_hash
      user = User.find_or_create_by_auth_hash(auth_hash)
      sign_in!(user)
      redirect_to root_url
    end

    protected

    def auth_hash
      request.env['omniauth.auth']
    end
  end
end
