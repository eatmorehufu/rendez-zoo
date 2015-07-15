Rails.application.routes.draw do

  root 'root#root'
  resources :users, only: [:new, :create, :edit, :update]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resource :current_user, only: [:show]
    resources :groups, only: [:index, :show]
    resources :events, only: [:index, :show]
  end
end
