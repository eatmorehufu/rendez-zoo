class RemoveEventAddresses < ActiveRecord::Migration
  def change
    drop_table :event_addresses
  end
end
