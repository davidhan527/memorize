# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    @props = {
      signed_in: user_signed_in?,
      paths: {
        verses: verses_path,
        cards: cards_path,
        sign_in: user_session_path,
        sign_out: destroy_user_session_path
      }
    }
  end
end
