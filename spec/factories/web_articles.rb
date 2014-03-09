# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :web_article do
    sequence(:url) { |n| "http://exampleurl#{n}.com" }
  end
end
