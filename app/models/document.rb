class Document
  include Mongoid::Document

  field :text, default: ""
end
