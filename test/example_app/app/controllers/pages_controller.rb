class PagesController < ApplicationController
  def view_component
  end

  def view_consecutive
  end

  def controller_component
    render react_component: "Hello", props: { name: "a component rendered from a controller" }
  end
end
