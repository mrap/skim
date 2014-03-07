require 'spec_helper'

describe WebArticle do
  it { should be_kind_of Document }
  it { should have_field :url }
  it { should validate_presence_of :url }
  it { should validate_uniqueness_of :url }

  describe "parsing the article" do
    let(:url) { "http://mrap-blog.tumblr.com/post/65954235304/writing-client-bdd-specs-for-a-rails-api" }
    let(:web_article) { WebArticle.create_from_url(url) }

    it "should set the text to the article's text" do
      web_article.text.should include "Think Vine for sharing live music"
    end
  end
end
