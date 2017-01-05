require "webpacker/react/version"

module Webpacker
  module React
  end
end

require 'webpacker/react/railtie' if defined?(Rails)
