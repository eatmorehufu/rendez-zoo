module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)
      if @user.save
        login!(@user)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      current_user.update!(user_params)
      @user = current_user
      render :show
    end

    def show
      @user = User.includes(:interests, member_groups: [:members, :organizers], organizer_groups: [:members, :organizers]).find(params[:id])
    end

    private

    def user_params
      params.require(:user).permit(:email, :description, :zip_code, :avatar, :password, :username)
    end
  end

end
