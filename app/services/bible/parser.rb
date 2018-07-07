module Bible
  class Parser
    def initialize(response)
      @response = response
    end

    def call
      parsed_response['passages'].first.squish
    end

    private

    def parsed_response
      JSON.parse(@response.body)
    end
  end
end
