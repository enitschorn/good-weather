class UserMailer < ApplicationMailer
  def user_registration
    @user = params[:user]
    mail(to: @user.email, subject: "Complete registration")
  end

  def admin_invitation
    @user = params[:user]
    @token = params[:token]
    mail(to: @user.email, subject: "Invited to admin")
  end
end
