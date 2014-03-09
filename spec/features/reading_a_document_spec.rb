require 'spec_helper'

feature "Reading a custom document" do
  given(:text) { "This is my document." }
  background { @document = create(:document, text: text) }

  scenario "User inserts custom text on the homepage" do
    visit '/'
    fill_in 'Enter any text you want to read', with: text
    click_on "Skim text"
  end
end
