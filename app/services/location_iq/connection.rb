require 'faraday'

module LocationIq
  class Connection
    BASE = 'https://locationiq.org'.freeze

    def self.api
      Faraday.new(url: BASE) do |faraday|
        faraday.response :logger
        faraday.adapter Faraday.default_adapter
      end
    end
  end
end
