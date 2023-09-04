const primaryHeader = document.querySelector('.primary-header')
const logo = document.querySelector('.logo')
const scrollWatcher = document.createElement('div')

scrollWatcher.setAttribute('data-scroll-watcher', '')
primaryHeader.before(scrollWatcher)

const navObserver = new IntersectionObserver((entries) => {
    primaryHeader.classList.toggle('sticking', !entries[ 0 ].isIntersecting)
    logo.classList.toggle('sticking', !entries[0].isIntersecting)
}, {rootMargin: "100px 0px 0px 0px"})

navObserver.observe(scrollWatcher)
