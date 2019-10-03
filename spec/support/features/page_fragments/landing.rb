module PageFragments
  module Landing
    include PageFragments::Util

    def messages
      browser.find("#flash").text
    end

    def title
      browser.find("main h1").text
    end
  end
end
