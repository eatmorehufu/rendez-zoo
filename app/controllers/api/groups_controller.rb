module Api
  class GroupsController < ApplicationController

    def show
      @group = Group.includes(:events, :members, :organizers).find(params[:id])

      render :show
    end

    def index
      @groups = Group.all

      render :index
    end

    def create
      @group = current_user.owned_groups.new(group_params)
      if @group.save
        GroupMembership.create!(group_id: @group.id, member_id: current_user.id, status: "organizer")
        render :show;
      else
        render json: @group.errors.full_messages
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

    private

    def group_params
      params.require(:group).permit(:title, :description, :zip_code, :owner_id)
    end

  end
end
