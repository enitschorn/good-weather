namespace :user do
  desc "Make user admin user:make_admin[email]"
  task :make_admin, [:email] => :environment do |_task, args|
    user = User
           .find_by(email: args[:email])
    user.update!(
      user_actions: (user.user_actions || {}).merge(admin: { can_administer: true }),
    )
    UserMailer.with(user: user).admin_invitation.deliver_later
  end
end
