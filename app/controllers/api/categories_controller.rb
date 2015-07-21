module Api
  class CategoriesController < ApplicationController
    def show
      @category = Category.includes(:users, :groups).find(params[:id])
    end

    def index

    end

  end
end
