class AddStateAndCityToGroupsTable < ActiveRecord::Migration
  def change
    add_column :groups, :city, :string
    add_column :groups, :state, :string
    add_index :groups, :city
    add_index :groups, :state
  end
end
