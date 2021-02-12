class Forecast < ApplicationRecord
  belongs_to :location_forecast

  def daily_data=(value)
    self[:user_actions] = value.is_a?(String) ? JSON.parse(value) : value
  end

  def hourly_data=(value)
    self[:user_actions] = value.is_a?(String) ? JSON.parse(value) : value
  end
end
