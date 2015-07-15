class AddOwnerIdColumnToGroups < ActiveRecord::Migration
  def change
    add_column :groups, :owner_id, :integer
    change_column :groups, :owner_id, :integer, null: false
    add_index :groups, :owner_id
  end
end
