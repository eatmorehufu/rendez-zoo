Rails.application.routes.draw do
  get 'groups/index'

  get 'groups/new'

  get 'groups/create'

  get 'groups/edit'

  get 'groups/update'

  get 'groups/destroy'

  root 'groups#index'
  resources :users, only: [:new, :create, :edit, :update]
  resources :sessions, only: [:new, :create, :destroy]
  resources :groups
end
