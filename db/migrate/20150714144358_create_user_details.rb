class CreateUserDetails < ActiveRecord::Migration
  def change
    create_table :user_details do |t|
      t.integer :user_id, null: false
      t.text :description
      t.string :zip_code
      t.string :avatar_url

      t.timestamps
    end

    add_index :user_details, :user_id, unique: true
  end
end
