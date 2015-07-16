Rails.application.routes.draw do

  root 'root#root'
  resources :users, only: [:new, :create, :edit, :update]
  resource :session, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resource :current_user, only: [:show, :destroy]
    resources :groups, only: [:index, :show, :create] do
      delete "leave"
      post "join"
    end
    resources :events, only: [:index, :show, :create] do
      post "rsvp"
      delete "unrsvp"
    end
  end
end
