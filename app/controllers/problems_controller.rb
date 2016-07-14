class ProblemsController < ApplicationController
  http_basic_authenticate_with name: "admin", password: "secretproblems", except:[:new, :create]

  def index
    params[:status].present? ? @problems = Problem.send(params[:status]) : @problems = Problem.all
    @problems = @problems.order("created_at DESC").page params[:page]
  end

  def new
    @problem = Problem.new
  end

  def create
    @problem = Problem.new(problem_params)
    @display_problem = Problem.approved.limit(1).order("RANDOM()")[0]
    @problem.save
    respond_to do |format|
      format.js
    end
  end

  def edit 
    @problem = Problem.find(params[:id])
  end

  def update
    @problem = Problem.find(params[:id])
    if params[:commit] == "Approve"
        params[:problem][:status] = "approved"
    else
      params[:problem][:status] = "rejected"
    end
    puts problem_params.to_yaml
    @problem.update(problem_params)
    next_problem = @problem.next
    if next_problem.present?
      redirect_to edit_problem_path(@problem.next)
    else
      redirect_to problems_path
    end
  end

  private
    def problem_params
      params.require(:problem).permit(:body, :email, :latitude, :longitude, :status)
    end
end
