class AddCityAndStateToGroup < ActiveRecord::Migration
  def change
    add_column :groups, :city, :string, index: true
    add_column :groups, :state, :string, index: true
  end
end
