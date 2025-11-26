import BackCardClient from "../../../../components/back-card-client";
import ProjectGalleryClient from "../../../../components/project-gallery-client";

const project = {
  slug: "musqet",
  title: "Musqet",
  sub: "Fully integrated debit, credit, contactless and Bitcoin payment terminal.",
  img: "/Musqeticon.png",
};

export default function MusqetPage() {
  return (
    <main className="cyrus-cv-bg">
      <BackCardClient />

      <div className="cyrus-card">
        <img src={project.img} alt={project.title} className="cyrus-card-img" />
        <div className="cyrus-card-body">
          <h1 className="cyrus-card-name">{project.title}</h1>
          <p className="cyrus-card-role">{project.sub}</p>
          <a
            className="cyrus-resume-btn"
            href="https://musqet.tech/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '0.5rem', display: 'inline-flex' }}
            aria-label="Open project link"
          >
            <span>Link ↗</span>
          </a>
        </div>
    </div>

    {/* Gallery card */}
    <ProjectGalleryClient images={["/Musqet1.png"]} altPrefix={project.title} />

    <section className="cyrus-section">
        <h2 className="cyrus-section-title">Context</h2>
        <p className="cyrus-section-text">Musqet is a UK-based payment infrastructure provider enabling merchants to accept both card and cryptocurrency payments. The platform combines in-store and online payment solutions with a unified dashboard, streamlining payment flows for merchants and supporting low-cost transactions.</p>

        <h3 className="cyrus-section-title" style={{ marginTop: '0.6rem' }}>Role</h3>
        <ul className="cyrus-role-list">
          <li>Led early wireframing and MVP design of Musqet’s core payment platform, defining initial user flows for merchant onboarding, payment acceptance (card + Bitcoin), and dashboard management.</li>
          <li>Defined product scope and feature set for the initial release, collaborating with design and engineering to translate business needs into a functioning MVP.</li>
          <li>Supported development of investor materials and data room content to facilitate fundraising and showcase product roadmap, traction, and market potential.</li>
        </ul>
        {/* Link button moved into the top card */}
      </section>
      {/* Bottom back card for convenience */}
      <BackCardClient />
    </main>
  );
}
