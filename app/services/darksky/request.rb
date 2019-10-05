module Darksky
  class Request
    class << self
      def forecast(lat:, long:)
        api.get(
          ["forecast",
           Rails.configuration.darksky_api_key,
           "#{lat},#{long}?units=si"].join('/')
        )
      end

      def api
        Connection.api
      end
    end
  end
end
