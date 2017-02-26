require "test_helper"
require_relative "./renderer_test"

class RendererWithTurbolinksTest < RendererTest
  def url_prefix
    "/turbolinks"
  end

  test "Turbolinks visits" do
    require_js

    visit url_prefix + "/view_consecutive"

    assert page.has_content? "component 1"
    assert page.has_content? "component 2"

    click_link "Show 3"

    assert page.has_content? "component 3"

    click_link "Show 2"

    assert page.has_content? "component 1"
    assert page.has_content? "component 2"
    assert page.has_no_content? "component 3"
  end
end
