source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.7.2"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 6.1.1"
# Use postgresql as the database for Active Record
gem "pg", ">= 0.18", "< 2.0"
# Use Puma as the app server
gem "puma", "~> 5.3"
# Use SCSS for stylesheets
gem "sass-rails", ">= 6"
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem "webpacker", "~> 5.0"
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem "turbolinks", "~> 5"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder", "~> 2.7"
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.4.4", require: false

# admin dashboard
gem "administrate"
gem "administrate-field-active_storage"
gem "administrate-field-jsonb"

# image upload
gem "image_processing"
gem "mini_magick"

gem "aws-sdk-s3", require: false

# authentication
gem "devise"

gem "jwt"

# Feature flipping
# Flipper
gem "flipper"
# UI
gem "flipper-ui"
# Adapter
gem "flipper-active_record"

# api fetching
gem "faraday"

# Email sending on heroku
gem "sendgrid-ruby"

# email style inlining
gem "premailer-rails"

# background jobs
gem "sidekiq"

# API
gem "graphiql-rails", group: :development
gem "graphql"

group :test do
  gem "capybara", ">= 3.14"
  gem "capybara-email"
  gem "capybara-screenshot"

  gem "factory_bot_rails"
  gem "rspec-example_steps"
  gem "rspec-rails"
  gem "rspec-wait"
  gem "selenium-webdriver"
  gem "spring-commands-rspec"
  gem "webdrivers", "~> 3.0"
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: %i[mri mingw x64_mingw]

  gem "pry-rails"

  # Adding for consistent Ruby styling
  gem "rubocop"
  gem "rubocop-performance"
  gem "rubocop-rails"
  gem "rubocop-rspec"

  # recorded HTTP integrations
  gem "vcr"

  # allow viewing emails in development
  gem "letter_opener"
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "web-console", ">= 4.1.0"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]
