module Api
  class SearchesController < ApplicationController
      def search
        if (params[:type] == "Group")
          @search_results = Group
            .includes(:members, :organizers)
            .near(params[:location], params[:distance].to_i)
            .search_by_keyword(params[:query])
            .page(params[:page])
          @search_type = "Group"
        else
          @search_results = Event
            .includes(:attendees, :group)
            .search_by_keyword(params[:query])
            .page(params[:page])
          @search_type = "Event"
        end

        render :search
     end
  end
end
