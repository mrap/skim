require 'spec_helper'

feature "Seeing a list of the most recently read articles" do
  background do
    @stale_article = create(:web_article, last_read_at: DateTime.now.advance(days: -2))
    @recent_article = create(:web_article, last_read_at: DateTime.now)
    @average_article = create(:web_article, last_read_at: DateTime.now.advance(days: -1))
  end
  scenario "User is on the homepage" do
    visit '/'
    @recent_article.url.should appear_before @average_article.url
    @average_article.url.should appear_before @stale_article.url
  end
end
