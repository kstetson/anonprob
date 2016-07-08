class Problem < ApplicationRecord
  enum status: {
    submitted: 0,
    approved: 1,
    rejected: 2
  }

  before_create :set_submitted_status
  before_create :copy_body_to_original_body

  validates :body, presence: true

  private
    def set_submitted_status
      self.status = :submitted
    end

    def copy_body_to_original_body
      self.original_body = self.body
    end
end
