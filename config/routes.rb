Rails.application.routes.draw do
  resources :cards, only: [:index, :create, :update, :destroy]
  resources :verses, only: [:index, :show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
end
