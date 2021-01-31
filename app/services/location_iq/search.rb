module LocationIq
  class Search < Base
    attr_accessor :raw_response, :lat, :long, :latitude, :longitude

    class << self
      def fetch(query:)
        response = Request.search(query: query)
        Search.new(raw_response: JSON.parse(response.body))
      end
    end

    def initialize(args)
      super(args)
      @latitude = raw_response.first["lat"].to_f
      @longitude = raw_response.first["lon"].to_f
      @lat = @latitude
      @long = @longitude
    end
  end
end
