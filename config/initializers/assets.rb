# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join("node_modules")

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )

# TODO: mailers is not auto precompiling WTF? below works in dev but not in prod
# Rails.application.config.assets.precompile += %w[mailers.scss] if Rails.env.development?

if Rails.env.development?
  Rails.application.config.assets.precompile += %w[
    graphiql/rails/application.js
    graphiql/rails/application.css
  ]
end
