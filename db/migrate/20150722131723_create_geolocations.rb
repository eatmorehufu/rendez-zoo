class CreateGeolocations < ActiveRecord::Migration
  def change
    create_table :geolocations do |t|
      t.references :locatable, null: false, polymorphic: true, index: true
      t.float :lat, null: false, index: true
      t.float :lng, null: false, index: true

      t.timestamps null: false
    end
  end
end
