class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :passage, null: false
      t.string :text, null: false
      t.references :user, foreign_key: true, index: true
      t.datetime :last_viewed_at
      t.datetime :review_at

      t.timestamps
    end
  end
end
