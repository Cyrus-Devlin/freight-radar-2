import BackCardClient from "../../../../components/back-card-client";
import ProjectGalleryClient from "../../../../components/project-gallery-client";

const project = {
  slug: "kitchen-ventures",
  title: "Kitchen Ventures",
  sub: "Cloud-kitchen operator creating and launching food brands in partnership with celebrities.",
  img: "/KVIcon.png",
};

export default function KitchenVenturesPage() {
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
            href="https://www.kitchenventures.co.uk/"
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
  <ProjectGalleryClient images={["/KV1.jpeg", "/KV2.jpeg", "/KV3.jpeg"]} altPrefix={project.title} />

  <section className="cyrus-section">
        <h2 className="cyrus-section-title">Context</h2>
        <p className="cyrus-section-text">Kitchen Ventures is a UK-based cloud-kitchen operator and brand incubator that creates, scales, and operates multiple restaurant and food-service brands. The company combines virtual kitchen operations and multi-brand incubation, partnering with chefs, creators, and influencers to build scalable, delivery-focused restaurant brands.</p>

        <h3 className="cyrus-section-title" style={{ marginTop: '0.6rem' }}>Role</h3>
        <ul className="cyrus-role-list">
          <li>Evaluated multiple potential business models for Kitchen Ventures, including cloud‑kitchen operations, franchising/licensing, and real‑estate plays, analysing viability, scalability, and long-term profitability.</li>
          <li>Built detailed financial models to forecast revenue, costs, margins, and growth trajectories across a hybrid business model scenario.</li>
          <li>Contributed to the development of investor‑facing materials and data room documentation, supporting fundraising rounds and enabling transparent, data‑backed investment pitches.</li>
          <li>Collaborated closely with founders and executive leadership to shape the company’s go-to‑market strategy and growth roadmap, aligning product, operations, and expansion plans with investor expectations and market conditions.</li>
        </ul>
        {/* Link button moved into the top card */}
      </section>
      <BackCardClient />
    </main>
  );
}
