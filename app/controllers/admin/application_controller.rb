# All Administrate controllers inherit from this
# `Administrate::ApplicationController`, making it the ideal place to put
# authentication logic or other before_actions.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    before_action :authenticate_admin

    def authenticate_admin
      authenticate_user!
    end

    # Override this value to specify the number of elements to display at a time
    # on index pages. Defaults to 20.
    # def records_per_page
    #   params[:per_page] || 20
    # end

    def valid_action?(name, resource = resource_class)
      # TODO: in future let a user edit one self
      # if resource_class == User &&
      #    !current_user.user_actions&.dig("users", "can_edit")
      #   false
      if current_user.user_actions&.dig("admin", "can_administer")
        true
      else
        %w[index new edit destroy].exclude?(name.to_s) && super
      end
    end

    def scoped_resource
      return super.none unless current_user.user_actions&.dig("admin", "can_administer")

      super.all
    end
  end
end
