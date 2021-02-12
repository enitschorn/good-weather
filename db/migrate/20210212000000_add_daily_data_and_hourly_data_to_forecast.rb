class AddDailyDataAndHourlyDataToForecast < ActiveRecord::Migration[6.1]
  def change
    add_column :forecasts, :daily_data, :jsonb
    add_column :forecasts, :hourly_data, :jsonb
  end
end
