class CreateVersions < ActiveRecord::Migration[5.2]

  def change
    create_table :card_versions do |t|
      t.string   :item_type, {:null=>false}
      t.integer  :item_id,   null: false
      t.string   :event,     null: false
      t.string   :whodunnit
      t.text     :object

      t.datetime :created_at
    end
    add_index :card_versions, %i(item_type item_id)
  end
end
