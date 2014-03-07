require 'spec_helper'

describe WebArticlesController do
  let(:url) { "http://mrap-blog.tumblr.com/post/65954235304/writing-client-bdd-specs-for-a-rails-api" }

  describe "GET #show" do
    before { @web_article =  WebArticle.create_from_url(url) }
    it "should be successful" do
      get :show, id: @web_article.id
      response.should be_successful
    end
  end

  describe "POST #create" do
    it "should redirect to the created article" do
      post :create, web_article: { url: url }
      @web_article = WebArticle.where(url: url).first
      response.should redirect_to @web_article
    end
  end

  describe "GET #new" do
    it "should be successful" do
      get :new
      response.should be_successful
    end
  end
end
