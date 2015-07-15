Rails.application.routes.draw do

  root 'root#root'
  resources :users, only: [:new, :create, :edit, :update]
  resource :session, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resource :current_user, only: [:show, :destroy]
    resources :groups, only: [:index, :show]
    resources :events, only: [:index, :show]
  end
end
