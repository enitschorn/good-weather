module LocationIq
  class Search < Base
    attr_accessor :raw_response, :lat, :long

    class << self
      def fetch(query:)
        response = Request.search(query: query)
        Search.new(raw_response: JSON.parse(response.body))
      end
    end

    def initialize(args)
      super(args)
      @lat = raw_response.first["lat"].to_f
      @long = raw_response.first["lon"].to_f
    end
  end
end
