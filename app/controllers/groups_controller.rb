class GroupsController < ApplicationController
  def index
    @groups = Group.all #eventually this will be based on nearby groups
  end

  def create
    group = Group.new(group_params)
    if group.save
      GroupMembership.create!(group_id: group.id, member_id: current_user.id, status: "owner")
      #display some sort of success message
      redirect_to groups_url
    else
      flash.now[:errors] = group.errors.full_messages
      render :new
    end
  end

  def new

  end

  def show
    @group = Group.find_by(id: params[:id])

  end

  def group_params
    params.require(:group).permit(:title, :description, :zip_code)
  end
end
