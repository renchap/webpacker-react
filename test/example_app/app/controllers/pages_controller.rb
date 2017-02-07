class PagesController < ApplicationController
  def view_component
  end

  def controller_component
    render react_component: 'Hello', props: { name: 'a component rendered from a controller' }
  end
end
