class AddLocNameToEvents < ActiveRecord::Migration
  def change
    add_column :events, :loc_name, :string
  end
end
