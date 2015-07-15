module Api
  class GroupsController < ApplicationController

    def show
      @group = Group.includes(:events, :members).find(params[:id])

      render json: @group
    end

    def index
      @groups = Group.all

      render :index
    end

  end
end
