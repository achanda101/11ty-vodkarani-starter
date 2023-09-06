const primaryHeader = document.querySelector('.primary-header')
const logo = document.querySelector('.logo')
const scrollWatcher = document.createElement('div')
const mobileToggle = document.querySelector('.mobileToggle')
const body = document.querySelector('body')
const navDeck = document.querySelector('.nav-deck')

scrollWatcher.setAttribute('data-scroll-watcher', '')
primaryHeader.before(scrollWatcher)

const navObserver = new IntersectionObserver((entries) => {
    primaryHeader.classList.toggle('sticking', !entries[ 0 ].isIntersecting)
    logo.classList.toggle('sticking', !entries[0].isIntersecting)
}, {rootMargin: "100px 0px 0px 0px"})

navObserver.observe(scrollWatcher)

mobileToggle.onclick = function () {
    primaryHeader.classList.toggle('showMobile')
    body.classList.toggle('lockScroll')
    navDeck.classList.toggle('showMobile')
}
