require "administrate/field/base"

class GooglePlacesField < Administrate::Field::Base
  def to_s
    data
  end
end
