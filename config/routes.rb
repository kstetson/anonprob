Rails.application.routes.draw do
  root to: 'problems#new'

  resources :problems, only: [:index, :new, :create]
end
