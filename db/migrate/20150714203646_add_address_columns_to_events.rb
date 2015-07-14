class AddAddressColumnsToEvents < ActiveRecord::Migration
  def change
    add_column :events, :street1, :string
    add_column :events, :street2, :string
    add_column :events, :city, :string
    add_column :events, :zip_code, :string
    add_column :events, :state, :string
  end
end
