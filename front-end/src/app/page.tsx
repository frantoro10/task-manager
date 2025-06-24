import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Task Manager</h1>
          <p className="text-xl text-gray-600 mb-8">
            Organiza tus tareas de manera simple y eficiente
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/tasks"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Comenzar a organizar
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>✨ Crea, edita y completa tareas</p>
            <p>📱 Responsive y fácil de usar</p>
            <p>💾 Tus datos se guardan automáticamente</p>
          </div>
        </div>
      </div>
    </main>
  );
}
