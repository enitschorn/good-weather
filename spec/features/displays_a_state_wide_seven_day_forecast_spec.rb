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
      # should be root once we "launch"
      # visit root_path
      visit forecast_path
    end

    Then "the map is centered on Melbourne" do
      pending "a map like test thing being rendered on the page even if there are no forecasts"
      wait_for do
        page.find('[data-testid="map"]')
      end.to be_truthy
    end

    And "the locations are displayed"
    But "no forecasts are displayed"
    When "the fetch forecast job runs successfully"
    And "the home page is visited again"
    Then "there are forecasts for all the locations"
    And "the map cycles through each forecast day by day"
  end
end
