require "English"

namespace :example_app do
  desc "Runs yarn in test/example_app"
  task :yarn do
    sh "cd test/example_app && yarn"
  end

  desc "Runs webpack in test/example_app"
  task webpack: :yarn do
    sh "cd test/example_app && NODE_ENV=test ./bin/webpack"
  end
end

Rake::Task["test"].enhance ["example_app:webpack"]
