class AddDefaultReviewAtForCards < ActiveRecord::Migration[5.2]
  def change
    change_column_default(
      :cards,
      :review_at,
      -> { "CURRENT_TIMESTAMP" }
    )
  end
end
