module Api
  class GroupsController < ApplicationController

    def show
      @group = Group.includes(:members, :group_memberships, :organizer_memberships, :organizers, :categories, events: :attendees).find_by(slug: params[:id])
      render :show
    end

    def index
      if logged_in?
        latitude = current_user.latitude || 40.7142700
        longitude = current_user.longitude || -74.0059700
        @groups = Group.includes(:members, :organizers).near(
          [latitude, longitude],
          20
        )
      else
        @groups = Group.includes(:members, :organizers).near("New York, NY", 20)
      end

      render :index
    end

    def create
      @group = current_user.owned_groups.new(group_params)
      if @group.save
        GroupMembership.create!(group_id: @group.id, member_id: current_user.id, status: "organizer")
        render :show
      else
        render json: @group.errors.full_messages, status: :unprocessable_entity
      end
    end

    def leave
      @group = current_user.member_groups.find(params[:group_id])
      @group.members.destroy(current_user)

      render :show
    end

    def join
      @group = Group.find(params[:group_id])
      GroupMembership.create!(group_id: @group.id, member_id: current_user.id)

      render :show
    end

    def update
      @group = current_user.owned_groups.find(params[:id])

      if @group.update(group_params)
        render :show
      else
        render json: @group.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def group_params
      params.require(:group).permit(:title, :flair, :description, :zip_code, :owner_id, :avatar)
    end

  end
end
