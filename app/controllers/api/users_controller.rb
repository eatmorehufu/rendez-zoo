module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)
      if @user.save
        login!(@user)
        render :show
      else
        render json: "error, error"
      end
    end

    def edit

    end

    def update

    end

    def show

    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
  end

end
