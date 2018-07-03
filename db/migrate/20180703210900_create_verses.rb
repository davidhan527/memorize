class CreateVerses < ActiveRecord::Migration[5.2]
  def change
    create_table :verses do |t|
      t.string :book, null: false, index: true
      t.integer :chapter, null: false, index: true
      t.json :text, null: false

      t.timestamps
    end
  end
end
