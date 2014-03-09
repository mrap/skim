require 'spec_helper'

describe Document do
  it { should have_field(:text).with_default_value_of("") }
  it { should have_field(:last_read_at).of_type(DateTime) }
  it { should have_field(:created_at) }

  describe "sort by recently read" do
    before do
      @stale_doc = create(:document, last_read_at: DateTime.now.advance(days: -2))
      @recent_doc = create(:document, last_read_at: DateTime.now)
      @average_doc = create(:document, last_read_at: DateTime.now.advance(days: -1))
    end

    it "should return documents sorted by most recently read" do
      @results = Document.recently_read
      @results.first.should eq @recent_doc
      @results.last.should eq @stale_doc
    end
  end
end
