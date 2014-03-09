class DocumentsController < ApplicationController

  def show
    @document = Document.find(params[:id])
  end

  def create
    if @document = Document.create(text: params[:document][:text])
      redirect_to @document
    else
      render nothing: true, status: :bad_request
    end
  end

  def optimized
    @document = Document.find(params[:id])
    render json: SkimParser.optimized_array(@document.text).to_json
  end
end
