export default function Skills() {
  const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Three.js', 'MongoDB'];

  return (
    <section className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span key={skill} className="bg-white/10 px-4 py-2 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
