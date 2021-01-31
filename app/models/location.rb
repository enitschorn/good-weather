class Location < ApplicationRecord
  validates :name, presence: true
  has_many :location_forecasts
end
