"use client"

import React, { useState, useEffect } from "react";
import { projects } from "../lib/cyrus-projects";

export default function ProjectCardsClient() {
  // Persist the "see more" state so it remains enabled when returning
  // to the page after navigation.
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cyrus-showAll");
      if (stored === "true") setShowAll(true);
    } catch (e) {
      // localStorage not available or failed — ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cyrus-showAll", showAll ? "true" : "false");
    } catch (e) {
      // ignore write failures
    }
  }, [showAll]);
  const visible = showAll ? projects : projects.slice(0, 4);

  return (
    <div>
      <div className="cyrus-project-cards" role="list">
        {visible.map((p, i) => (
          <a
            key={p.slug}
            href={`/cyrus/projects/${p.slug}`}
            className="cyrus-project-card"
            role="listitem"
            aria-label={p.title}
          >
            <img className="cyrus-project-card-img" src={p.img} alt={p.title} />
            <div>
              <div className="cyrus-project-card-title">{p.title}</div>
              <div className="cyrus-project-card-sub">{p.sub}</div>
            </div>
          </a>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "0.6rem" }}>
        {!showAll ? (
          <button
            className="cyrus-see-more-btn"
            onClick={() => setShowAll(true)}
            aria-expanded={showAll}
          >
            See more
          </button>
        ) : (
          <button className="cyrus-see-more-btn" onClick={() => setShowAll(false)} aria-expanded={showAll}>
            See less
          </button>
        )}
      </div>
    </div>
  );
}
