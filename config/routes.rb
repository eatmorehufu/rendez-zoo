Rails.application.routes.draw do

  root 'groups#index'
  resources :users, only: [:new, :create, :edit, :update]
  resources :sessions, only: [:new, :create, :destroy]
  resources :groups do
    resources :members, only: [:index, :show]
    resources :events
  end

  namespace :api, efaults: { format: :json } do
    resources :groups, only: [:index, :show]
    resources :events, only: [:index, :show]
  end
end
