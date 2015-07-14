class CreateEventAttendances < ActiveRecord::Migration
  def change
    create_table :event_attendances do |t|
      t.integer :attendant_id, null: false
      t.integer :event_id, null: false

      t.timestamps null: false
    end
      add_index :event_attendances, :attendant_id
      add_index :event_attendances, :event_id
      add_index :event_attendances, [:attendant_id, :event_id], unique: true
  end
end
