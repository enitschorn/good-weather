module Types
  class Forecast < Types::BaseObject
    field :id, ID, null: false
    field :location, Types::Location, null: false
    field :date, String, null: false
    field :summary, String, null: false
    field :temperature_low, Float, null: false
    field :temperature_high, Float, null: false
    field :icon, String, null: false
  end
end
