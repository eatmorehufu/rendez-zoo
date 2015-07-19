class RemoveUserDetails < ActiveRecord::Migration
  def change
    drop_table :user_details
  end
end
