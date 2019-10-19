require 'rails_helper'

describe LocationIq::Search do
  it 'searches for location by name' do
    VCR.use_cassette("search_location") do
      melbourne_location = LocationIq::Search
                           .fetch(query: "Melbourne")
      expect(melbourne_location.lat).to eq(-37.8142176)
      expect(melbourne_location.long).to eq(144.9631608)
    end
  end
end
