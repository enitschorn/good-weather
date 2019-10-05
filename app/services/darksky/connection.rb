require 'faraday'

module Darksky
  class Connection
    BASE = 'https://api.darksky.net'.freeze

    def self.api
      Faraday.new(url: BASE) do |faraday|
        faraday.response :logger
        faraday.adapter Faraday.default_adapter
      end
    end
  end
end
