class HomeController < ApplicationController
  def enable_flip # rubocop:disable Metrics/AbcSize
    begin
      unless signed_in?
        user = User.with_reset_password_token(params[:reset_token])
        sign_in user
      end
      jwt_payload = JWT.decode(params[:token], Rails.application.secrets.secret_key_base).first
      current_user_id = jwt_payload["id"]
      # TODO: the feature flip should be passed in the jwt payload
      if current_user && current_user.id == current_user_id
        Flipper[:beta_search].enable current_user
        flash[:success] = "Congratulations you are now part of the Good Weather Beta."
      else # rubocop:disable Style/EmptyElse
        # TODO: the beta invite did not match the user you were signed in as?
        #       maybe the sign_in user failed?
      end
    rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
      # head :unauthorized
    end
    redirect_to root_path
  end
end
