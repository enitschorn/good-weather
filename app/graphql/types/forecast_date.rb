module Types
  class ForecastDate < Types::BaseObject
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :display_date, String, null: false
    field :is_weekend, Boolean, null: false
  end
end
