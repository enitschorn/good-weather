require "rails_helper"

feature "Bootstrap and enable beta access to forecast", js: true do
  scenario "bootstrap and beta access to forecast" do
    When "Gina Bianchini of Mightybell visits good weather and signs up via early beta" do
      visit root_path
      wait_for do
        page.find_all(".pre-container .jumbotron button").map(&:text)
      end.to eq(["Register for early beta"])
      page.find(".pre-container .jumbotron button", text: "Register for early beta").click
      page.find("form.new_user").fill_in("Email", with: "gina.bianchini@mightybell.com")
      page.find("form.new_user").find('input[type="submit"]').click
    end

    Then "she sees a notification that she should check her email for a link to activate her account" do
      wait_for do
        page.find('.alert [data-testid="message"]').text
      end.to eq "A message with a confirmation link has been sent to your email address. " \
        "Please follow the link to activate your account."
    end

    But "she is still on the landing page and is NOT logged in" do
      wait_for do
        page.find_all("nav.navbar .nav-link").map(&:text)
      end.to contain_exactly("Log in", "Sign up")
    end

    When "she activates her account via the email" do
      open_email "gina.bianchini@mightybell.com"
      wait_for do
        current_email.text
      end.to match(/Welcome gina.bianchini@mightybell.com!.*confirm.*link below: CONFIRM MY ACCOUNT.*/)
      current_email.click_link "CONFIRM MY ACCOUNT"
      clear_emails
    end

    Then "she sees she is on the preview and signed in" do
      expect(page).to have_current_path("/preview")
      wait_for do
        page.find_all("nav.navbar .nav-link").map(&:text)
      end.to eq ["gina.bianchini@mightybell.com"]
    end

    When "admin invites them to beta" do
      page.find("nav a", text: "Sign out").click

      User.create!(
        email: "jess.lee@polyvore.com",
        user_actions: { admin: { can_administer: true } },
        password: "1password",
        password_confirmation: "1password",
        confirmed_at: DateTime.now,
      )

      visit admin_users_path

      page.find("form.new_user").fill_in("Email", with: "jess.lee@polyvore.com")
      page.find("form.new_user").fill_in("Password", with: "1password")
      page.find("form.new_user").find('input[type="submit"]').click
      wait_for do
        page.find(".flashes .flash").text
      end.to eq "Signed in successfully."
      page.refresh # deal with the flash animating down and next click not working

      page.find("td", text: "gina.bianchini@mightybell.com").click
      page.find(".form-actions a", text: "Send Beta Invitation Email").click

      page.find(".navigation a", text: "Back to app").click
      page.find("nav a", text: "Sign out").click
    end

    Then "user gets email" do
      open_email "gina.bianchini@mightybell.com"
      wait_for do
        current_email.text
      end.to match(/lucky ones to get a Beta invitations to Good Weather.*next 24 hours.*ACCEPT BETA/)
    end

    When "user is NOT signed in" do
      wait_for do
        page.find_all("nav.navbar .nav-link").map(&:text)
      end.to contain_exactly("Log in", "Sign up")
    end

    And "user accepts beta invite" do
      current_email.click_link "ACCEPT BETA"
    end

    Then "the user is logged in and sees a Good Weather beta success message" do
      wait_for do
        page.find_all("nav.navbar .nav-link").map(&:text)
      end.to include("gina.bianchini@mightybell.com")
      wait_for do
        page.find('.alert [data-testid="message"]').text
      end.to eq "Congratulations you are now part of the Good Weather Beta."
    end

    And "all the Good Weather beta menu items" do
      wait_for do
        page.find_all("nav.navbar .nav-link").map(&:text)
      end.to contain_exactly(
        "Forecast",
        "gina.bianchini@mightybell.com",
      )
    end
  end
end
