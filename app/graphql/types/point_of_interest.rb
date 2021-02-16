module Types
  class PointOfInterest < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :latitude, String, null: true
    field :longitude, String, null: true
    field :phone, String, null: false
    field :website, String, null: false
    field :address, String, null: false
    field :email, String, null: false
    field :description, String, null: false
    field :feature_image_urls, [Types::Url], null: true
  end
end
