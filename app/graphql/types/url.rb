module Types
  class Url < Types::BaseObject
    field :filename, String, null: false
    field :url, String, null: true
  end
end
