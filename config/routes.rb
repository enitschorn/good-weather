Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql" if Rails.env.development?
  post "/graphql", to: "graphql#execute"
  namespace :admin do
    resources :locations
    resources :users

    root to: "users#index"
  end
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "test_root", to: "rails/welcome#index", as: "test_root_rails"

  get "/search" => "search#index"
  get "/search/*all" => "search#index"

  root to: "home#index"
end
