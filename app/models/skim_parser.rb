class SkimParser

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
