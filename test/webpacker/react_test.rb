require 'test_helper'

module Webpacker
  class ReactTest < Minitest::Test
    def test_that_it_has_a_version_number
      refute_nil ::Webpacker::React::VERSION
    end
  end
end
