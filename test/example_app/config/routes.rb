Rails.application.routes.draw do
  get "/view", to: "pages#view_component"
  get "/controller", to: "pages#controller_component"

  root to: "pages#view_component"
end
