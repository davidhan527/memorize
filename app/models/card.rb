class Card < ApplicationRecord
  has_paper_trail class_name: 'CardVersion'
  belongs_to :user

  rails_admin do
    configure :user do
      label 'Owner of this card: '
    end
  end
end
