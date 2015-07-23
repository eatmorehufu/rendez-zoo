class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.references :imagable, polymorphic: true, index: true

      t.timestamps null: false
    end
  end
end
