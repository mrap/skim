class SkimParser

  def self.optimized_array(text)
    text_array = []
    text.split(/[[:space:]]+/).map do |word|
      text_array << { word: word, optimum_index: self.optimum_index(word) }
    end
    text_array
  end

  def self.optimum_index(word)
    @length = word.length

    if @length < 2
      index = 0
    elsif @length <= 4
      index = 1
    else
      index = (@length * 0.4).to_i
    end

    index = index + 1 if word[0].match(/[[:punct:]]/)
    index = index - 1 if word[word.length - 1].match(/[[:punct:]]/)

    return index
  end

  private

    def self.punctuationless_word(word)
      word.downcase.gsub(/[^a-z ]/, '').gsub(/ /, '-')
    end
end
