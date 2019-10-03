module PageFragments
  module Dashboard
    include PageFragments::Util

    class Navigation
      def initialize(node)
        @node = node
      end

      def account
        @node.find('[data-testid="account"]').text
      end
    end

    def title
      browser.find("h1").text
    end

    def navigation
      Navigation.new(browser.find(".navigation"))
    end

    def messages
      browser.find(".flashes").text
    end

    def details
      key_value("dl dt", "dl dd")
    end

    # rubocop:disable Metrics/MethodLength
    def add_slide(args = {})
      form_action("Slides")
      form_action("New slide")
      args
        .select { |label, _value| label.to_sym == :Slideshow }
        .each do |label, value|
        select(label => value)
      end
      form_action(
        "Create Slide",
        args.reject { |label, _value| label.to_sym == :Slideshow }
      )
    end

    # rubocop:enable Metrics/MethodLength

    def go_to_slideshow(title)
      form_action("Slideshows")
      browser.click_on(title)
    end

    def start_slideshow_link
      browser.find("a", text: "start")["href"]
    end
  end
end
