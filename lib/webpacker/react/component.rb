module Webpacker
  module React
    class Component
      include ActionView::Helpers::TagHelper
      include ActionView::Helpers::TextHelper

      attr_accessor :name

      def initialize(name)
        @name = name
      end

      def render(props = {}, options = {})
        data = { data: { "react-class" => @name, "react-props" => props.to_json } }
        content_tag(:div, nil, options.deep_merge(data))
      end
    end
  end
end
