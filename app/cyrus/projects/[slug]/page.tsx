import BackCardClient from "../../../../components/back-card-client";
import { projects } from "../../../../lib/cyrus-projects";

interface Props {
  params: { slug: string };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <main className="cyrus-cv-bg">
        <div className="cyrus-section">
          <h2 className="cyrus-section-title">Project not found</h2>
          <p className="cyrus-section-text">We couldn't find that project.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="cyrus-cv-bg">
      {/* Back card (client) */}
      <BackCardClient />

      {/* Project summary card */}
      <div className="cyrus-card">
        <img src={project.img} alt={project.title} className="cyrus-card-img" />
        <div className="cyrus-card-body">
          <h1 className="cyrus-card-name">{project.title}</h1>
          <p className="cyrus-card-role">{project.sub}</p>
        </div>
      </div>

      {/* Placeholder detail section - reuse existing section styles */}
      <section className="cyrus-section">
        <h2 className="cyrus-section-title">About</h2>
        <p className="cyrus-section-text">{project.sub}</p>
      </section>
    </main>
  );
}
