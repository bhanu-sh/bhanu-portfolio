export default function Projects() {
  return (
    <section className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-semibold">Project {i}</h3>
            <p className="text-gray-400 text-sm mt-2">
              Short project description with technologies used.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
