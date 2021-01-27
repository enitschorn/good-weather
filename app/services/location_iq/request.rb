module LocationIq
  class Request
    class << self
      def search(query:)
        api.get(
          [
            "/v1/search.php",
            {
              key: Rails.configuration.locaton_iq_api_key,
              city: query,
              state: "Victoria",
              format: "json",
            }.to_query,
          ].join("?"),
        )
      end

      def api
        Connection.api
      end
    end
  end
end
