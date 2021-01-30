module PageFragments
  Page = Struct.new :rspec_example do
    # Capybara DSL + rspec example context
    alias_method :browser, :rspec_example
  end

  module DelegateSynchronize
    def synchronize(...)
      page.document.synchronize(...)
    end
  end

  def classify(string)
    string.to_s.split("_").map(&:capitalize).join
  end

  def focus_on(*args)
    require File.join(__dir__, "page_fragments", args.map(&:to_s))
    mod = args.inject(PageFragments) do |klass, sub_klass|
      klass.const_get(classify(sub_klass))
    end
    page = Page.new(self).extend(mod)
    page.browser.extend(DelegateSynchronize)
    yield page if block_given?
    page
  end
end
