Rails.application.routes.draw do
  root 'groups#index'
  resources :users, only: [:new, :create, :edit, :update]
  resources :sessions, only: [:new, :create, :destroy]
  resources :groups
end
