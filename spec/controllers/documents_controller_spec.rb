require 'spec_helper'

describe DocumentsController do
  describe "GET #show" do
    before { @document = create(:document) }
    it "should be successful" do
      get :show, id: @document.id.to_s
      response.should be_successful
    end
  end
  describe "POST #create" do
    it "should be successful" do
      post :create, document: { text: "This is my document." }
      @document = Document.where(text: "This is my document." ).first
      response.should redirect_to @document
    end
  end
end
