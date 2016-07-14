class AddAddressToProblem < ActiveRecord::Migration[5.0]
  def change
    add_column :problems, :address, :string
  end
end
