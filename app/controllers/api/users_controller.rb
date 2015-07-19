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

    def update
      if params[:id] != current_user.id
        render json: "error, error"
      else
        @user.update!(user_params)
        render :show
      end
    end

    def show
      @user = User.find(params[:id])
    end

    private

    def user_params
      params.require(:user).permit(:email, :description, :zip_code, :avatar, :password, :username)
    end
  end

end
