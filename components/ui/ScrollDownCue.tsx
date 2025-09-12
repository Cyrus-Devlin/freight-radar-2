import { useEffect, useState } from 'react'

export default function ScrollDownCue() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Fade out after scrolling 10vh
      setHidden(window.scrollY > window.innerHeight * 0.1)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-1/2 bottom-4 z-30 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 ${hidden ? 'opacity-0' : 'opacity-100'}`}
    >
      <span className="sr-only">Scroll down</span>
      <div className="animate-bounce">
        <svg
          className="w-8 h-8 text-white drop-shadow-lg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
