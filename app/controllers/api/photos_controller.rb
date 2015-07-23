class PhotosController < ApplicationController
  def create
    @group = Group.find(params[:group_id])
    photo = @group.photos.new(photo_params)
    if photo.save
      render :index
    else
      render json: "error, error"
    end
  end

  def destroy
    @group = Group.find(params[:group_id])
    photo = Photo.find(params[:id])
    photo.destroy!
    render :index
  end

  def index
    @group = Group.find(params[:group_id])
  end

  private

  def photo_params
    params.require(:photo).permit(:pic)
  end

end
