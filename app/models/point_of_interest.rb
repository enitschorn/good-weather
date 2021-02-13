class PointOfInterest < ApplicationRecord
  belongs_to :user, optional: false
  belongs_to :location, optional: true

  enum status: { pending: 0, active: 1, archived: 9 }
end
