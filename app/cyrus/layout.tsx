import './cyrus.css'

export default function CyrusLayout({ children }: { children: React.ReactNode }) {
  // Nested layouts must not render their own <html> or <body> elements.
  // Return a simple wrapper so the root layout's html/body remain intact.
  return (
    <div className="cyrus-body">
      {children}
    </div>
  )
}
