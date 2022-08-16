# frozen_string_literal: true

module ReactComponentsRails
  module Helpers
    def react_component(component_name, props = {}, options = {})
      ReactComponentsRails::Component.new(component_name).render(props, options)
    end
  end
end
