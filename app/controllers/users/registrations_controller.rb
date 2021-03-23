class Users::RegistrationsController < Devise::RegistrationsController # rubocop:disable Style/ClassAndModuleChildren
  # POST /resource
  def create
    super do |resource|
      if resource.password.blank?
        temp_password = SecureRandom.hex(16)

        resource.password = temp_password
        resource.password_confirmation = temp_password
        resource.save
      end
    end
  end
end
