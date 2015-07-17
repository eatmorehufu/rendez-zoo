Rails.application.routes.draw do

  root 'root#root'
  resources :users, only: [:new, :create, :edit, :update]
  resource :session, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:show, :create, :edit, :update]
    resources :groups, only: [:index, :show, :update, :create] do
      delete "leave"
      post "join"
    end
    resources :events, only: [:index, :show, :update, :create] do
      post "rsvp"
      delete "unrsvp"
    end
  end
end
