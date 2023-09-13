const fadeinElements = document.querySelectorAll('.fade-in')
const fadeinTriggers = document.querySelectorAll('.fadeinTrigger')
let index = 0
fadeinTriggers.forEach(trigger => {
    trigger.setAttribute('data-fadein-watcher', index++)
})

// const fadeinObserver = new IntersectionObserver((entries) => {
//     fadeinElements.forEach(elem => {
//         elem.classList.toggle('appear', !entries[0].isIntersecting)
//     }, {rootMargin: "0px 100px 0px 0px"})
// })
// fadeinObserver.observe(fadeinWatcher)

const appearOptions = {
    threshold: 0.25
}

// NOTE: If you are using the trigger method there must be matching fade-in
// and trigger elements
// if it is mobile device, do simple fade-in without triggers
// OR if there are no trigger elements do simple fade-in
if (window.matchMedia("(max-width: 50em)").matches || fadeinTriggers.length == 0) {
    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        } else {
            entry.target.classList.add('appear')
            appearOnScroll.unobserve(entry.target)
        }
    })
    }, appearOptions)
    
    fadeinElements.forEach(fader => {
        appearOnScroll.observe(fader)
    })
} else {
    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            } else {
                // TODO: uncomment after you get multiple stickybits working
                // document.querySelectorAll('.appear').forEach(elem => {
                //     elem.classList.remove('appear')
                // })
                const index = entry.target.getAttribute('data-fadein-watcher')
                fadeinElements[index].classList.add('appear')
                appearOnScroll.unobserve(entry.target)
            }
        })
    }, appearOptions)
    
    fadeinTriggers.forEach(trigger => {
        appearOnScroll.observe(trigger)
    })
}