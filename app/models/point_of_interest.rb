class PointOfInterest < ApplicationRecord
  belongs_to :user, optional: false
  belongs_to :location, optional: true

  enum status: { pending: 0, active: 1, archived: 9 }

  has_many_attached :feature_images

  def feature_image_urls
    map_urls(feature_images)
  end

  private

  def map_urls(attachments)
    attachments.map do |attachment|
      # attachment.service_url for S3 direct
      {
        filename: attachment.filename.to_s,
        url: Rails.application.routes.url_helpers.rails_blob_url(
          attachment,
          host: host,
        ),
      }
    end
  end

  def host
    if Rails.env.production?
      "https://stg-good-weather.herokuapp.com"
    else
      "http://localhost:#{Rails::Server::Options.new.parse!(ARGV)[:Port]}"
    end
  end
end
