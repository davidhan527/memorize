module Bible
  class Parser
    def initialize(response)
      @response = response
    end

    def parse_text
      passage.to_s.squish
    end

    def parse_html
      html_passage = Nokogiri::HTML(passage)
      html_passage.at('a.mp3link')['href']
    end

    private

    def parsed_response
      JSON.parse(@response.body)
    end

    def passage
      parsed_response['passages'].first
    end
  end
end
