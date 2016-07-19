class AddSeverityAndTagsToProblem < ActiveRecord::Migration[5.0]
  def change
    add_column :problems, :severity, :integer
    add_column :problems, :tags, :string
  end
end
