class AddDescriptionZipColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :description, :text
    add_column :users, :zip_code, :string
  end
end
