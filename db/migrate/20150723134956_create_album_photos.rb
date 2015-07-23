class CreateAlbumPhotos < ActiveRecord::Migration
  def change
    create_table :album_photos do |t|
      t.references :imagable, polymorphic: true, index: true

      t.timestamps null: false
    end
  end
end
