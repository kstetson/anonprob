Rails.application.routes.draw do
  root to: 'problems#new'

  resources :problems, except: [:destroy, :show]
end
