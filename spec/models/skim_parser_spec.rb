require 'spec_helper'

describe SkimParser do

  context "when the word is less than 5 characters" do
    context "2 letter word" do
      let(:word) { "no" }
      it "should return index 1 (2nd letter)" do
        SkimParser.optimum_index(word).should eq 1
      end
    end

    context "3 letter word" do
      let(:word) { "noo" }
      it "should return index 1 (2nd letter)" do
        SkimParser.optimum_index(word).should eq 1
      end
    end

    context "4 letter word" do
      let(:word) { "noob" }
      it "should return index 1 (2nd letter)" do
        SkimParser.optimum_index(word).should eq 1
      end
    end
  end

  context "when the word is equal to or greater than 5 characters" do
    context "word has an odd amount of letters" do
      let(:word) { "noobs" }
      it "should return the middle index" do
        SkimParser.optimum_index(word).should eq 2
      end
    end
    context "word has an even amount of letters" do
      let(:word) { "noober" }
      it "should return the index before the middle index" do
        SkimParser.optimum_index(word).should eq 2
      end
    end
  end
end
