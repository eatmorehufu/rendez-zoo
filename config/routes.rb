Rails.application.routes.draw do

  root 'root#root'
  resources :users, only: [:new, :create, :edit, :update]
  resources :sessions, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :groups, only: [:index, :show]
    resources :events, only: [:index, :show]
  end
end
