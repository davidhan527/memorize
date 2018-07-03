class Parser
  BASE_URI = ''

  def text
    html = get(verses)
    parse_text(html)
  end

  def get(verses)
    agent.get(passage(verses))
  end

  def passage(verses)
    URI.escape ""
  end

  def parse_text
    html
  end

  def agent
    Mechanize.new
  end
end
