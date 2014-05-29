class Document
  include Mongoid::Document
  include Mongoid::Timestamps

  MAX_DOCUMENTS_LIMIT = 100

  field :text, default: ""
  field :last_read_at, type: DateTime, default: DateTime.now

  scope :recently_read, ->{ order_by(last_read_at: :desc) }
  after_create :enforce_document_limit

  # Destroys the oldest read document if over the documents limit.
  # Required to keep MongoHQ 'free'.
  def enforce_document_limit
    Document.recently_read.last.destroy if Document.count > MAX_DOCUMENTS_LIMIT
  end
end
