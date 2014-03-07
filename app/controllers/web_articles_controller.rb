class WebArticlesController < ApplicationController

  def show
    @web_article = WebArticle.find(params[:id])
  end

  def new
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
