class AddCityAndStateToUser < ActiveRecord::Migration
  def change
    add_column :users, :city, :string, index: true
    add_column :users, :state, :string, index: true
  end
end
