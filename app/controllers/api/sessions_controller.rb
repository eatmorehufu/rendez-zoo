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
  end
end
