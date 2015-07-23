class AddUniquenessToGroupsColumns < ActiveRecord::Migration
  def change
    change_column :groups, :slug, :string, unique: true, null: false
    change_column :groups, :flair, :string, default: "member", null: false
  end
end
