class AddUserToCards < ActiveRecord::Migration[5.2]
  def change
    add_reference :cards, :user, foreign_key: true, index: true
  end
end
