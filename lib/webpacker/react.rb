require "webpacker/react/version"

module Webpacker
  module React
  end
end

require "webpacker/react/railtie" if defined?(Rails)
require "webpacker/react/helpers"
require "webpacker/react/component"
