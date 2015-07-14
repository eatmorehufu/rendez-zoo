class CreateEventAddresses < ActiveRecord::Migration
  def change
    create_table :event_addresses do |t|
      t.integer :event_id, null: false
      t.string :street1
      t.string :street2
      t.string :city
      t.string :state
      t.string :zip_code

      t.timestamps null: false
    end

    add_index :event_addresses, :event_id
    add_index :event_addresses, :street1
    add_index :event_addresses, :city
    add_index :event_addresses, :state
    add_index :event_addresses, :zip_code
  end
end
