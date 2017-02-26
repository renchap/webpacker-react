import Hello from 'components/hello';
import WebpackerReact from 'webpacker-react';
import Turbolinks from 'turbolinks';

Turbolinks.start()

if (!window.Turbolinks) {
  console.error("Turbolinks failed to install")
}

WebpackerReact.register(Hello)
WebpackerReact.initialize()
