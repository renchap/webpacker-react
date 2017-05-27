# webpacker:check_webpack_binstubs is looking for binstubs
# in the gem root directory. We need to disable it for our
# tests, as it tries to check they exist when loading the
# example app

task "webpacker:check_webpack_binstubs"
Rake::Task["webpacker:check_webpack_binstubs"].clear
