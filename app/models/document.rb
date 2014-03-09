class Document
  include Mongoid::Document
  include Mongoid::Timestamps

  field :text, default: ""
  field :last_read_at, type: DateTime

  scope :recently_read, ->{ order_by(last_read_at: :desc) }
end
