require "rails_helper"

feature "displays a state wide seven day forecast", js: true do
  scenario "displays a seven day forecast" do
    Given "Melbourne as a starting location" do
      # presumably we need to set the user location somehow
    end

    And "forecast locations strategically scattered around the state of Victoria" do
      create(
        :location,
        name: "Bairnsdale",
        latitude: -37.853671, # TODO: these could be enriched using the appropriate job
        longitude: 147.603693,
        is_fetching_forecast: true,
      )
      create(
        :location,
        name: "Melbourne",
        latitude: -37.814218,
        longitude: 144.963161,
        is_fetching_forecast: true,
      )
      create(
        :location,
        name: "Warrnambool",
        latitude: -38.382624,
        longitude: 142.481419,
        is_fetching_forecast: true,
      )
      create(
        :location,
        name: "Warragul",
        latitude: -38.150476,
        longitude: 145.93028,
        is_fetching_forecast: false, # NOTE: false
      )
    end

    When "the home page is visited" do
      visit root_path
    end

    Then "the map is centered on Melbourne" do
      wait_for do
        page.find('[data-testid="map"]')
      end.to be_truthy
      # dismiss the developer version of maps
      page.find(".dismissButton").click
    end

    And "the locations are displayed" do
      wait_for do
        page
          .find_all('[data-testid|="map-marker"]')
          .map do |marker_div|
          [
            marker_div.text,
            { lat: marker_div["lat"], lng: marker_div["lng"] },
          ]
        end
          .to_h
      end.to match(
        {
          "Bairnsdale" => { lat: "-37.853671", lng: "147.603693" },
          "Melbourne" => { lat: "-37.814218", lng: "144.963161" },
          "Warragul" => { lat: "-38.150476", lng: "145.93028" },
          "Warrnambool" => { lat: "-38.382624", lng: "142.481419" },
        },
      )
    end

    But "no forecasts are displayed" do
      wait_for do
        page.find_all('[data-testid|="forecast-marker"]')
      end.to be_empty
    end

    When "the fetch forecast job runs successfully" do
      pending "how will forecasts be displayed"
      expect(false).to be_truthy # how to run a fake forecast cron job
    end

    And "the home page is visited again"
    Then "there are forecasts for all the locations"
    And "the map cycles through each forecast day by day"
  end
end
