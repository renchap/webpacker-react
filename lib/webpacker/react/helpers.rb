module Webpacker
  module React
    module Helpers
      def react_component(class_name, props = {}, &block)
        tag('div', data: { 'react-class' => class_name, 'react-props' => props.to_json })
      end
    end
  end
end
