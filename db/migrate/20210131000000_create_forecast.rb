class CreateForecast < ActiveRecord::Migration[6.1]
  def change
    create_table :location_forecasts, id: :uuid do |t|
      t.references :location, foreign_key: true, null: false, type: :uuid
      t.date :date
    end
    add_index :location_forecasts, %i[location_id date], unique: true

    create_table :forecasts, id: :uuid do |t|
      t.references :location_forecast, foreign_key: true, null: false, type: :uuid
      t.date :date, null: false
      t.time :time
      t.string :summary, null: false
      t.decimal :temperature_low, null: false
      t.decimal :temperature_high, null: false

      t.timestamps
    end
  end
end
