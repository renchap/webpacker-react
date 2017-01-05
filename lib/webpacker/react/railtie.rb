require 'rails/railtie'
require 'webpacker/react/helpers'

class Webpacker::React::Engine < ::Rails::Engine
  initializer :webpacker_react do
    ActiveSupport.on_load(:action_controller) do
      ActionController::Base.helper ::Webpacker::React::Helpers
    end
  end
end
