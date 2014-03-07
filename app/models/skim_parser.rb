class SkimParser

  def self.optimized_array(text)
    text_array = []
    text.split(" ").map do |word|
      text_array << { word: word, optimum_index: self.optimum_index(word) }
    end
    text_array
  end

  def self.optimum_index(word)
    @length = word.length

    return 1 if @length <= 4

    if @length % 2 == 0
      @length / 2 - 1
    else
      @length / 2
    end
  end
end
