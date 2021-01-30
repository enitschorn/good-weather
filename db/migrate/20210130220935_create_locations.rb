class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations, id: :uuid do |t|
      t.string :name, null: false
      t.decimal :latitude, precision: 10, scale: 6, default: 0
      t.decimal :longitude, precision: 10, scale: 6, default: 0
      t.boolean :is_fetching_forecast, default: false

      t.timestamps
    end
  end
end
