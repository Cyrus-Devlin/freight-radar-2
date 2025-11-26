import BackCardClient from "../../../../components/back-card-client";
import ProjectGalleryClient from "../../../../components/project-gallery-client";

const project = {
  slug: "edf",
  title: "EDF",
  sub: "HPC nuclear power stations in Britain providing zero-carbon electricity for around 6M homes.",
  img: "/EDFicon.png",
};

export default function EDFPage() {
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
            href="https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c"
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
  <ProjectGalleryClient images={["/EDF1.jpg","/EDF2.jpg","/EDF3.jpg"]} altPrefix={project.title} />

  <section className="cyrus-section">
        <h2 className="cyrus-section-title">Context</h2>
        <p className="cyrus-section-text">EDF engaged Future Arc to support with a transformation programme within its Supply Chain function to address operational complexity, modernise legacy processes, and strengthen its ability to meet evolving business needs. The initiative was structured into six dedicated workstreams, each targeting a priority area such as data, strategy, human resources, and supplier relationships. The Business & Insights workstream focused on understanding the current-state landscape, surfacing inefficiencies, and defining the strategic foundations required to support long-term operational improvement.</p>

        <h3 className="cyrus-section-title" style={{ marginTop: '0.6rem' }}>Role</h3>
        <ul className="cyrus-role-list">
          <li>Owned supply-chain reporting as a product. Defined KPI framework with the Supply Chain Director and shipped real-time dashboards (Power BI, SQL, Python) replacing a two-week manual cycle, saving ~£100k/yr and reducing overdue comms by 25%.</li>
          <li>Ran discovery with functional leads, translated needs into PRDs/user stories, prioritised a dashboard backlog, and managed delivery/data dependencies.</li>
          <li>Delivered a digital capability review that identified ~£5m annual OPEX savings and informed executive decision-making.</li>
        </ul>
        {/* Link button moved into the top card */}
      </section>
      <BackCardClient />
    </main>
  );
}
