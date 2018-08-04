class AddRankingColumnToCards < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :ranking, :integer, default: 0, null: false
  end
end
