module Webpacker
  module React
    module Helpers
      def react_component(component_name, props = {}, options = {})
        Webpacker::React::Component.new(component_name).render(props, options)
      end
    end
  end
end
