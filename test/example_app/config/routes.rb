Rails.application.routes.draw do
  get "/view", to: "pages#view_component"
  get "/view_consecutive", to: "pages#view_consecutive"
  get "/controller", to: "pages#controller_component"

  root to: "pages#view_component"
end
