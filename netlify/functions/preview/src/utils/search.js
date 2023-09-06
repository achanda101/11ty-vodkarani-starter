const searchBtn = document.querySelector('.searchBtn')
const closeBtn = document.querySelector('.closeBtn')
const searchBox = document.querySelector('.searchBox')

searchBtn.onclick = function () {
    searchBox.classList.add('active')
    searchBtn.classList.add('active')
    closeBtn.classList.add('active')
    // Hide the mobile menu toggle button
    mobileToggle.classList.add('hide')
}

closeBtn.onclick = function () {
    searchBox.classList.remove('active')
    searchBtn.classList.remove('active')
    closeBtn.classList.remove('active')
    mobileToggle.classList.remove('hide')
}