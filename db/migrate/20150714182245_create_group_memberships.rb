class CreateGroupMemberships < ActiveRecord::Migration
  def change
    create_table :group_memberships do |t|
      t.integer :member_id, null: false
      t.integer :group_id, null: false
      t.string :status, null: false, default: "member"

      t.timestamps null: false
    end

    add_index :group_memberships, :member_id
    add_index :group_memberships, :group_id
    add_index :group_memberships, [:member_id, :group_id], unique: true
  end
end
