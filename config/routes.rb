Rails.application.routes.draw do
  devise_for :users

  resources :cards, only: [:index, :create, :update, :destroy] do
    put :reviewed, on: :member
  end

  resources :verses, only: [:index, :show]

  root 'home#index'
end
