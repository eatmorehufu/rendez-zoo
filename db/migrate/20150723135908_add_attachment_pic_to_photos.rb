class AddAttachmentPicToPhotos < ActiveRecord::Migration
  def self.up
    change_table :photos do |t|
      t.attachment :pic
    end
  end

  def self.down
    remove_attachment :photos, :pic
  end
end
