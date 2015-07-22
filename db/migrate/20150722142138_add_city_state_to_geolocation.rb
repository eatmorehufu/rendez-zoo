class AddCityStateToGeolocation < ActiveRecord::Migration
  def change
    add_column :geolocations, :city, :string, null: false
    add_column :geolocations, :state, :string, null: false
  end
end
