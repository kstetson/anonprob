class CreateProblems < ActiveRecord::Migration[5.0]
  def change
    create_table :problems do |t|
      t.text :body
      t.text :original_body
      t.string :email
      t.integer :status
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
