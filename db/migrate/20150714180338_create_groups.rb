class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :title, null: false
      t.text :description
      t.string :zip_code, null: false

      t.timestamps null: false
    end
    add_index :groups, :title
    add_index :groups, :zip_code
  end
end
