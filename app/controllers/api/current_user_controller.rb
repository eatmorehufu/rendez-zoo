module Api
  class CurrentUserController < ApplicationController
    def show
      if logged_in?        
        render :show
      else
        render json: User.new()
      end
    end
  end
end
