namespace :user do
  desc "Make user admin user:make_admin[email]"
  task :make_admin, [:email] => :environment do |_task, args|
    User
      .find_by(email: args[:email])
      .update!(user_actions: { "admin": { "can_administer": true } })
  end
end
