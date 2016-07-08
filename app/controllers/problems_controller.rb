class ProblemsController < ApplicationController
  def new
    @problem = Problem.new
  end

  def create
    @problem = Problem.new(problem_params)
    @display_problem = Problem.limit(1).order("RANDOM()")[0]
    @problem.save
    respond_to do |format|
      format.js
    end
  end

  private
    def problem_params
      params.require(:problem).permit(:body, :email, :latitude, :longitude)
    end
end
