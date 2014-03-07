require 'spec_helper'

describe Document do
  it { should have_field(:text).with_default_value_of("") }
end
