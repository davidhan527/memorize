class Card < ApplicationRecord
  has_paper_trail class_name: 'CardVersion'
  belongs_to :user

end
