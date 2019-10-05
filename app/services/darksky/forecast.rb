module Darksky
  class Forecast < Base
    attr_accessor :raw_response, :weather_summary

    class << self
      def fetch(lat:, long:)
        response = Request.forecast(lat: lat, long: long)
        Forecast.new(raw_response: JSON.parse(response.body))
      end
    end

    def initialize(args)
      super(args)
      @weather_summary = format_columns(extract_day_summary)
    end

    private

    def extract_day_summary
      raw_response["daily"]["data"]
        .map do |day|
        [
          Time.at(day["time"]).to_date.strftime("%a %e %b"),
          day["temperatureHigh"].round,
          day["icon"]
        ]
      end
    end

    def format_columns(columns)
      col_widths = extract_col_widths(columns)

      columns.map do |line|
        line.each_with_index.map do |field, index|
          format("%#{col_widths[index]}s", field)
        end.join(" | ")
      end.join("\n")
    end

    def extract_col_widths(data)
      data.each_with_object({}) do |line, counts|
        line.each_with_index do |field, index|
          counts[index] = [
            (counts[index] || 0),
            field.to_s.chars.length
          ].max
        end
      end
    end
  end
end
