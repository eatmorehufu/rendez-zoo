class EventsController < ApplicationController
  def create
    @event = Event.new(event_params)
    @event.group_id = params[:group_id]
    if @event.save
      redirect_to group_url(@event.group_id)
    else
      render :new
    end
  end

  def new
    @group = Group.find_by(id: params[:group_id])
  end

  def show

  end

  private

  def event_params
    params.require(:event).permit(
      :start_time,
      :end_time,
      :title,
      :description,
      :street1,
      :street2,
      :city,
      :state,
      :zip_code
    )
  end

  def address_params
    params.require(:event_address).permit()
  end
end
