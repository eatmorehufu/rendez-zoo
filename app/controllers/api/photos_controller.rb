module Api
  class PhotosController < ApplicationController
    def create
      @group = Group.find_by(slug: params[:group_id])
      @photo = @group.photos.new(photo_params)
      if @photo.save
        render :show
      else
        render json: @photo.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @group = Group.find_by(slug: params[:group_id])
      photo = Photo.find(params[:id])
      photo.destroy!
      render :index
    end

    def index
      @group = Group.find_by(slug: params[:group_id])
    end

    private

    def photo_params
      params.require(:photo).permit(:pic)
    end

  end

end
