module Api
  class EventsController < ApplicationController
    def create      
      @event = Event.includes(:group).new(event_params)
      if @event.group.organizers.include?(current_user) && @event.save
        @event.attendee_ids = [current_user.id]
        render :show
      else
        render json: "Error, error!"
      end
    end

    def new
      @group = Group.find_by(id: params[:group_id])
      @event = Event.new
    end

    def show
      @event = Event.includes(:attendees).find(params[:id])
    end

    def index

    end

    def rsvp
      @event = Event.find(params[:event_id])
      @event.attendee_ids = @event.attendee_ids.concat([current_user.id])

      render :show
    end

    def unrsvp
      @event = current_user.events.find(params[:event_id])
      @event.attendee_ids = @event.attendee_ids - [current_user.id]

      render :show
    end

    private

    def event_params
      params.require(:event).permit(
        :start_timepick,
        :group_id,
        :end_timepick,
        :title,
        :description,
        :street1,
        :street2,
        :city,
        :state,
        :zip_code,
        :start_day,
        :end_day
      )
    end
  end
end
