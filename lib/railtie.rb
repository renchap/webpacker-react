# frozen_string_literal: true

require "rails/railtie"

module ReactComponentsRails
  class Engine < ::Rails::Engine
    initializer :react_components do
      ActiveSupport.on_load(:action_controller) do
        ActionController::Base.helper ::ReactComponentsRails::Helpers
      end

      ActiveSupport.on_load :action_view do
        include ::ReactComponentsRails::Helpers
      end
    end

    initializer :react_components_rails_renderer, group: :all do |_app|
      ActionController::Renderers.add :react_component do |component_name, options|
        props = options.fetch(:props, {})
        tag_options = options.fetch(:tag_options, {})
        html = ReactComponentsRails::Component.new(component_name).render(props, tag_options)
        render_options = options.merge(inline: html)
        render(render_options)
      end
    end
  end
end
