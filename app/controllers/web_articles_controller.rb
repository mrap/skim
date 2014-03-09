class WebArticlesController < ApplicationController

  def show
    @web_article = WebArticle.find(params[:id])
    @web_article.last_read_at = DateTime.now
  end

  def new
    @recently_read_articles = WebArticle.recently_read.limit(5)
  end

  def create
    if @web_article = WebArticle.create_from_url(params[:web_article][:url])
      redirect_to @web_article
    else
      render nothing: true, status: :bad_request
    end
  end

  def optimized
    @web_article = WebArticle.find(params[:id])
    render json: SkimParser.optimized_array(@web_article.text).to_json
  end
end
