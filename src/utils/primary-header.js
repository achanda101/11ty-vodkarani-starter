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
}, {rootMargin: "5px 0px 0px 0px"})

navObserver.observe(scrollWatcher)

mobileToggle.onclick = function () {
    primaryHeader.classList.toggle('showMobile')
    body.classList.toggle('lockScroll')
    navDeck.classList.toggle('showMobile')
}

// Multilevel Menu Navigation
var dropDownMenuFunc = function (e) {
    const isDropdownLink = e.target.closest("[data-dropdown-link]") != null

    // if clicking inside the already open dropdown menu, do nothing
    if (!isDropdownLink && e.target.closest("[data-link-active]") != null) return

    let currentDropdown
    if (isDropdownLink) {
        currentDropdown = e.target.closest("[data-dropdown]")
        currentDropdown.setAttribute("data-link-active", "data-link-active")
    }
}

var hideDropDownMenuFunc = function (e) {
    const isDropdownLink = e.target.closest("[data-link-active]") != null
    let currentDropdown
    if (isDropdownLink) {
        currentDropdown = e.target.closest("[data-dropdown]")
        currentDropdown.removeAttribute("data-link-active") 
    }
}

document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
    // if not a mobile device, add the event listeners to the dropdown elements in the menu
    if (!window.matchMedia("(max-width: 50em)").matches) {
        dropdown.addEventListener('mouseover', dropDownMenuFunc, false)
        dropdown.addEventListener('mouseleave', hideDropDownMenuFunc, false)
    }
})

// Handle checkbox "checked" events for mobile menu
var mobMenuItemCheckedFunc = function (e) {
    let currentDropdown = e.target.closest("[data-dropdown]")
    currentDropdown.setAttribute("data-link-active", "data-link-active")
}

document.querySelectorAll('.m-menu-checkbox').forEach(mcheckbox => {
    // if it is a mobile device, add the event listeners to the checkboxes in the mobile menu
    if (window.matchMedia("(max-width: 50em)").matches) {
        mcheckbox.addEventListener('change', mobMenuItemCheckedFunc, false)
    }
})