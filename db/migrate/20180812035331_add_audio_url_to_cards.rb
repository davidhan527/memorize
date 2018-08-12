class AddAudioUrlToCards < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :audio_url, :string
  end
end
