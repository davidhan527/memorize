Rails.application.routes.draw do
  resources :cards, only: [:index, :create, :update, :destroy] do
    put :reviewed, on: :member
  end
  resources :verses, only: [:index, :show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
end
