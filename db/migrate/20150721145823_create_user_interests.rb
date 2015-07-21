class CreateUserInterests < ActiveRecord::Migration
  def change
    create_table :user_interests do |t|
      t.integer :user_id, null: false
      t.integer :category_id, null: false

      t.timestamps null: false
    end
    add_index :user_interests, [:user_id, :category_id], unique: true;
  end
end
