class GroupsController < ApplicationController
  def index
    @groups = Group.all #eventually this will be based on nearby groups    
  end

  def create
    group = Group.new(group_params)
    if group.save
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

  end

  def group_params
    params.require(:group).permit(:title, :description, :zip_code)
  end
end
