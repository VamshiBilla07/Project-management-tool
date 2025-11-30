import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../api';
import ProjectForm from './ProjectForm';
import './ProjectList.css';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getAll();
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects. Make sure the backend server is running.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      await projectsAPI.create(projectData);
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      console.error('Error creating project:', err);
      throw err;
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project? All tasks will be deleted as well.')) {
      return;
    }

    try {
      await projectsAPI.delete(id);
      fetchProjects();
    } catch (err) {
      alert('Failed to delete project');
      console.error('Error deleting project:', err);
    }
  };

  const getProjectStats = (project) => {
    const total = project.tasks.length;
    const completed = project.tasks.filter(t => t.status === 'completed').length;
    const inProgress = project.tasks.filter(t => t.status === 'in_progress').length;
    return { total, completed, inProgress };
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="project-list">
      <div className="page-header">
        <div>
          <h2>Projects</h2>
          <p className="subtitle">Manage your projects and track progress</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + New Project
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📁</div>
          <h3>No projects yet</h3>
          <p>Create your first project to get started</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Create Project
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map(project => {
            const stats = getProjectStats(project);
            const progress = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

            return (
              <div key={project.id} className="project-card">
                <div className="project-card-header">
                  <div>
                    <h3>{project.name}</h3>
                    <span className={`badge badge-${project.status}`}>
                      {project.status}
                    </span>
                  </div>
                  <button
                    className="close-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteProject(project.id);
                    }}
                    title="Delete project"
                  >
                    ×
                  </button>
                </div>

                {project.description && (
                  <p className="project-description">{project.description}</p>
                )}

                <div className="project-stats">
                  <div className="stat">
                    <span className="stat-label">Total Tasks</span>
                    <span className="stat-value">{stats.total}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">In Progress</span>
                    <span className="stat-value">{stats.inProgress}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Completed</span>
                    <span className="stat-value">{stats.completed}</span>
                  </div>
                </div>

                <div className="progress-section">
                  <div className="progress-header">
                    <span className="progress-label">Progress</span>
                    <span className="progress-percentage">{Math.round(progress)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <Link to={`/projects/${project.id}`} className="btn btn-secondary btn-sm">
                  View Details →
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ProjectList;
