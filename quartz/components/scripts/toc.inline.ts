const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const slug = entry.target.id
    const tocEntryElements = document.querySelectorAll(`a[data-for="${slug}"]`)
    const windowHeight = entry.rootBounds?.height
    if (windowHeight && tocEntryElements.length > 0) {
      if (entry.boundingClientRect.y < windowHeight) {
        tocEntryElements.forEach((tocEntryElement) => tocEntryElement.classList.add("in-view"))
      } else {
        tocEntryElements.forEach((tocEntryElement) => tocEntryElement.classList.remove("in-view"))
      }
    }
  }
})

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function setupMobileToc() {
  const toggle = document.querySelector('.toc-mobile-toggle')
  const sidebar = document.querySelector('.toc-mobile-sidebar')
  const overlay = document.querySelector('.toc-mobile-overlay')
  const closeBtn = document.querySelector('.toc-mobile-close')
  
  if (!toggle || !sidebar || !overlay || !closeBtn) return
  
  // Show toggle button on mobile only
  if (window.innerWidth <= 768) {
    (toggle as HTMLElement).style.display = 'block'
  }
  
  const openToc = () => {
    sidebar.classList.add('open')
    overlay.classList.add('open')
    document.body.style.overflow = 'hidden'
  }
  
  const closeToc = () => {
    sidebar.classList.remove('open')
    overlay.classList.remove('open')
    document.body.style.overflow = 'auto'
  }
  
  toggle.addEventListener('click', openToc)
  closeBtn.addEventListener('click', closeToc)
  overlay.addEventListener('click', closeToc)
  
  // Close TOC when clicking on a link
  const tocLinks = sidebar.querySelectorAll('a')
  tocLinks.forEach(link => {
    link.addEventListener('click', closeToc)
  })
  
  window.addCleanup(() => {
    toggle.removeEventListener('click', openToc)
    closeBtn.removeEventListener('click', closeToc)
    overlay.removeEventListener('click', closeToc)
    tocLinks.forEach(link => {
      link.removeEventListener('click', closeToc)
    })
  })
}

function setupToc() {
  for (const toc of document.getElementsByClassName("toc")) {
    const button = toc.querySelector(".toc-header")
    const content = toc.querySelector(".toc-content")
    if (!button || !content) return
    button.addEventListener("click", toggleToc)
    window.addCleanup(() => button.removeEventListener("click", toggleToc))
  }
  
  setupMobileToc()
}

document.addEventListener("nav", () => {
  setupToc()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))
})
