Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql" if Rails.env.development?
  post "/graphql", to: "graphql#execute"
  namespace :admin do
    resources :users do
      member do
        get :send_beta_invitation
      end
    end
    resources :locations
    resources :location_forecasts
    resources :forecasts
    resources :point_of_interests

    root to: "users#index"
  end
  devise_for :users, controllers: {
    registrations: "users/registrations",
    confirmations: "users/confirmations",
  }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "test_root", to: "rails/welcome#index", as: "test_root_rails"

  # TODO: move under admin and add authentication and admin authorization
  # flipper route
  mount Flipper::UI.app(Flipper) => "/flipper"

  resource :forecast, only: %i[index]

  get "/forecast" => "forecast#index"

  resources :home, only: [:show] do
    collection do
      get :enable_flip
    end
  end

  get "/search" => "search#index"
  get "/search/*all" => "search#index"
  authenticated :user do
    get "/preview" => "home#preview"
    get "/" => redirect("/preview")
  end

  root to: "home#index"
end
