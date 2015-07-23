Rails.application.routes.draw do

  root 'root#root'

  namespace :api, defaults: { format: :json } do
    get "/search", to: "searches#search"
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:show, :create, :edit, :update]
    resources :groups, only: [:index, :show, :update, :create] do
      resources :photos, only: [:create, :destroy, :index]
      delete "leave"
      post "join"
    end

    resources :categories, only: [:show, :index]
    resources :events, only: [:index, :show, :update, :create] do
      post "rsvp"
      delete "unrsvp"
    end
  end
end
