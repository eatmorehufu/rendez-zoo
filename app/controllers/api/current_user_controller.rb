module Api
  class CurrentUserController < ApplicationController
    def show
      if logged_in?
        render :show
      else
        render json: User.new()
      end
    end

    def destroy
      logout!(current_sesh.id)
      render json: User.new()
    end
  end
end
