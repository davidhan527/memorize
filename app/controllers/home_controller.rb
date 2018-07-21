class HomeController < ApplicationController
  def index
    @props = { paths: { verses: verses_path, cards: cards_path } }
  end
end
