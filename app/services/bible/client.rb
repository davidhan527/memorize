module Bible
  class Client
    BASE_URI = 'https://api.esv.org/v3/passage'

    def initialize(passage)
      @passage = passage
    end

    def get
      response = connection(BASE_URI + '/text/').get do |req|
        req.params['q'] = @passage.to_s
        with_default_settings(req)
      end

      Bible::Parser.new(response).parse_text
    end

    def get_audio
      response = connection(BASE_URI + '/html/').get do |req|
        req.params['q'] = @passage.to_s
      end

      Bible::Parser.new(response).parse_html
    end

    private

    def with_default_settings(req)
      req.params['include-passage-references'] = false
      req.params['include-first-verse-numbers'] = false
      req.params['include-verse-numbers'] = false
      req.params['include-footnotes'] = false
      req.params['include-footnote-body'] = false
      req.params['include-short-copyright'] = false
      req.params['include-passage-horizontal-lines'] = false
      req.params['include-heading-horizontal-lines'] = false
      req.params['include-headings'] = false
    end

    def connection(url)
      @connection ||= Faraday.new(url: url) do |conn|
        conn.headers['Authorization'] = "Token #{Rails.application.secrets.esv_api}"
        conn.adapter(Faraday.default_adapter)
      end
    end
  end
end
