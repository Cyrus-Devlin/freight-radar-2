"use client"

import React from "react";

export default function BackCardClient() {
  return (
    <button
      type="button"
      className="cyrus-card cyrus-back-card"
      onClick={() => (typeof window !== 'undefined' ? window.history.back() : undefined)}
      aria-label="Go back"
      style={{ cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <svg className="cyrus-back-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="cyrus-back-label">Back</div>
        </div>
      </div>
    </button>
  );
}
