class CreateGroupCategories < ActiveRecord::Migration
  def change
    create_table :group_categories do |t|
      t.integer :group_id, null: false
      t.integer :category_id, null: false

      t.timestamps null: false
    end
    add_index :group_categories, [:group_id, :category_id], unique: true
  end
end
