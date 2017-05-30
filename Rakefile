require "bundler/gem_tasks"
require "rake/testtask"
require "English"

Rake::TestTask.new(:test) do |t|
  t.libs << "test"
  t.libs << "lib"
  t.test_files = FileList["test/**/*_test.rb"]
  t.verbose = true
end

task default: :test

# webpacker:check_webpack_binstubs is looking for binstubs
# in the gem root directory. We need to disable it for our
# tests, as it tries to check they exist when loading the
# example app

task "webpacker:check_webpack_binstubs"
Rake::Task["webpacker:check_webpack_binstubs"].clear

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
