require "rails_helper"

describe Darksky::Forecast do
  let(:melbourne_lat) { -37.8142176 }
  let(:melbourne_long) { 144.9631608 }

  # TODO: CI is UTC date formatted
  xit "fetches weather for upcoming weekend" do
    VCR.use_cassette("forecast") do
      melbourne_weather = Darksky::Forecast
                          .fetch(
                            lat: melbourne_lat,
                            long: melbourne_long,
                          )
      expect(
        melbourne_weather.weather_summary,
      ).to eq <<~FORECAST_OUTPUT.strip_heredoc.chomp
        Sat  5 Oct | 22 | partly-cloudy-day
        Sun  6 Oct | 24 | partly-cloudy-day
        Mon  7 Oct | 18 |              rain
        Tue  8 Oct | 13 |              rain
        Wed  9 Oct | 15 |              rain
        Thu 10 Oct | 16 |            cloudy
        Fri 11 Oct | 17 | partly-cloudy-day
        Sat 12 Oct | 20 |         clear-day
      FORECAST_OUTPUT
    end
  end
end
