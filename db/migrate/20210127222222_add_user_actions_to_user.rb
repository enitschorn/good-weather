class AddUserActionsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :user_actions, :jsonb
  end
end
