require 'spec_helper'

feature "Reading a article from a url" do
  given(:link) { "http://mrap-blog.tumblr.com/post/65954235304/writing-client-bdd-specs-for-a-rails-api" }

  scenario "Reading an article from my blog" do
    visit '/'
    fill_in 'Enter a link to an article', with: link
    click_on "Skim it"
  end
end
