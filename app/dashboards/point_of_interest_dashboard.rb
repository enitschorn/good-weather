require "administrate/base_dashboard"

class PointOfInterestDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    user: Field::BelongsTo,
    location: Field::BelongsTo,
    feature_images: Field::ActiveStorage,
    id: Field::String.with_options(searchable: false),
    name: Field::String,
    address: GooglePlacesField,
    phone: Field::String,
    website: Field::String,
    email: Field::String,
    latitude: Field::String.with_options(searchable: false),
    longitude: Field::String.with_options(searchable: false),
    description: Field::Text,
    status: Field::Select.with_options(
      searchable: false,
      collection: lambda { |field|
                    field.resource.class.send(field.attribute.to_s.pluralize).keys
                  },
    ),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    user
    location
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    user
    location
    feature_images
    id
    name
    address
    phone
    website
    email
    latitude
    longitude
    description
    status
    created_at
    updated_at
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    user
    location
    feature_images
    name
    latitude
    longitude
    address
    phone
    website
    email
    description
    status
  ].freeze

  # COLLECTION_FILTERS
  # a hash that defines filters that can be used while searching via the search
  # field of the dashboard.
  #
  # For example to add an option to search for open resources by typing "open:"
  # in the search field:
  #
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how point of interests are displayed
  # across all pages of the admin dashboard.

  def permitted_attributes
    super + [feature_images: []]
  end

  def display_resource(point_of_interest)
    "PointOfInterest: #{point_of_interest.name}"
  end
end
