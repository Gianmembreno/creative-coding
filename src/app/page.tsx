import ProjectTile from '@/components/ProjectTile';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Creative Coding Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore a collection of interactive art, generative designs, and experimental code projects.
              Each piece represents a unique exploration of creativity through programming.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectTile key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State Message (if no projects) */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-4.5B4.875 8.25 2.25 10.875 2.25 14.25V16.5a3 3 0 003 3h13.5a3 3 0 003-3v-2.25z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No projects yet
            </h3>
            <p className="text-gray-400">
              Start creating amazing projects to showcase here!
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Creative Coding Projects. Built with passion and code.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
