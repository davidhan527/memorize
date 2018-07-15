class HomeController < ApplicationController
  def index
    @props = { paths: { verses: verses_path } }
  end
end
