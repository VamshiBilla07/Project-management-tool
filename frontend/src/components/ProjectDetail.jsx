import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projectsAPI, tasksAPI } from '../api';
import TaskForm from './TaskForm';
import ProjectForm from './ProjectForm';
import './ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getById(id);
      setProject(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch project details');
      console.error('Error fetching project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await tasksAPI.create({ ...taskData, projectId: id });
      setShowTaskModal(false);
      fetchProject();
    } catch (err) {
      console.error('Error creating task:', err);
      throw err;
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await tasksAPI.update(editingTask.id, taskData);
      setEditingTask(null);
      fetchProject();
    } catch (err) {
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await tasksAPI.delete(taskId);
      fetchProject();
    } catch (err) {
      alert('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const handleUpdateProject = async (projectData) => {
    try {
      await projectsAPI.update(id, projectData);
      setShowProjectModal(false);
      fetchProject();
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  };

  const getFilteredTasks = () => {
    if (!project) return [];
    if (filterStatus === 'all') return project.tasks;
    return project.tasks.filter(task => task.status === filterStatus);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isOverdue = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return <div className="loading">Loading project details...</div>;
  }

  if (error || !project) {
    return (
      <div className="error-container">
        <div className="error">{error || 'Project not found'}</div>
        <Link to="/" className="btn btn-primary">← Back to Projects</Link>
      </div>
    );
  }

  const filteredTasks = getFilteredTasks();

  return (
    <div className="project-detail">
      <div className="detail-header">
        <Link to="/" className="back-link">← Back to Projects</Link>
        
        <div className="project-header">
          <div className="project-title-section">
            <h2>{project.name}</h2>
            <span className={`badge badge-${project.status}`}>{project.status}</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowProjectModal(true)}>
            Edit Project
          </button>
        </div>

        {project.description && (
          <p className="project-description">{project.description}</p>
        )}
      </div>

      <div className="tasks-section">
        <div className="tasks-header">
          <div className="tasks-title">
            <h3>Tasks ({filteredTasks.length})</h3>
            <div className="filter-tabs">
              <button
                className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All
              </button>
              <button
                className={`filter-tab ${filterStatus === 'todo' ? 'active' : ''}`}
                onClick={() => setFilterStatus('todo')}
              >
                To Do
              </button>
              <button
                className={`filter-tab ${filterStatus === 'in_progress' ? 'active' : ''}`}
                onClick={() => setFilterStatus('in_progress')}
              >
                In Progress
              </button>
              <button
                className={`filter-tab ${filterStatus === 'completed' ? 'active' : ''}`}
                onClick={() => setFilterStatus('completed')}
              >
                Completed
              </button>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setShowTaskModal(true)}>
            + Add Task
          </button>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✓</div>
            <h3>No tasks {filterStatus !== 'all' ? `with status "${filterStatus.replace('_', ' ')}"` : 'yet'}</h3>
            <p>Create a task to get started</p>
            <button className="btn btn-primary" onClick={() => setShowTaskModal(true)}>
              + Add Task
            </button>
          </div>
        ) : (
          <div className="tasks-list">
            {filteredTasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <div className="task-title-row">
                    <h4>{task.title}</h4>
                    <div className="task-badges">
                      <span className={`badge badge-${task.status.replace('_', '-')}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                      <span className={`badge badge-${task.priority}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingTask(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}

                <div className="task-meta">
                  {task.assignee && (
                    <div className="task-meta-item">
                      <span className="meta-label">👤 Assignee:</span>
                      <span className="meta-value">{task.assignee}</span>
                    </div>
                  )}
                  <div className="task-meta-item">
                    <span className="meta-label">📅 Deadline:</span>
                    <span className={`meta-value ${isOverdue(task.deadline) && task.status !== 'completed' ? 'overdue' : ''}`}>
                      {formatDate(task.deadline)}
                      {isOverdue(task.deadline) && task.status !== 'completed' && ' (Overdue)'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showTaskModal && (
        <TaskForm
          onSubmit={handleCreateTask}
          onClose={() => setShowTaskModal(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={handleUpdateTask}
          onClose={() => setEditingTask(null)}
        />
      )}

      {showProjectModal && (
        <ProjectForm
          project={project}
          onSubmit={handleUpdateProject}
          onClose={() => setShowProjectModal(false)}
        />
      )}
    </div>
  );
}

export default ProjectDetail;
