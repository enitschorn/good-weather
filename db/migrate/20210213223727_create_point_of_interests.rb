class CreatePointOfInterests < ActiveRecord::Migration[6.1]
  def change
    create_table :point_of_interests, id: :uuid do |t|
      t.string :name, null: false
      t.string :address
      t.string :phone
      t.string :website
      t.string :email
      t.decimal :latitude, precision: 10, scale: 6, default: 0
      t.decimal :longitude, precision: 10, scale: 6, default: 0
      t.text :description
      t.references :location, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
