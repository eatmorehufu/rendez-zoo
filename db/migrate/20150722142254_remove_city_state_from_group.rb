class RemoveCityStateFromGroup < ActiveRecord::Migration
  def change
    remove_column :groups, :city
    remove_column :groups, :state
  end
end
