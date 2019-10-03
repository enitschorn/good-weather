module PageFragments
  module Slideshow
    include PageFragments::Util

    def content
      browser.find('main section[data-testid="content"]').text
    end

    def choose(next_slide_link_text)
      browser
        .find('main section[data-testid="next"]')
        .click_on(next_slide_link_text)
    end
  end
end
