class ChangeDefaultFlairToPlural < ActiveRecord::Migration
  def change
    change_column :groups, :flair, :string, default: "members", null: false
  end
end
