//Check If Thers Is Local Storage Color Option
let mainColors = localStorage.getItem("color-option")

if (mainColors !== null) {

    document.documentElement.style.setProperty(`--main-color`, mainColors)

    // Remove Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active")

        if (element.dataset.color === mainColors) {
            element.classList.add("active")


        }
    })

}


// Random Background Option
let BackgroundOption = true;

// Variable To Control The Backdround Interval
let backgroundInterval;

// Check If There Is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option")

if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === `true`) {
        BackgroundOption = true;
    } else {
        BackgroundOption = false;
    }
    document.querySelectorAll(".random-backgrounds span").forEach(element => {

        element.classList.remove("active")

    })
    if (backgroundLocalItem === `true`) {
        document.querySelector('.random-backgrounds .yes').classList.add("active")

    } else {
        document.querySelector('.random-backgrounds .no').classList.add("active")

    }
}

// Toggle Spin Class On Icons
document.querySelector(".toggle-settings .fa-gear").onclick = function() {

    // Toggle Class Fa-spin For Rotation On Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Setting Box
    document.querySelector(".settings-box").classList.toggle("open");

}


//Switch Colors
const colorsli = document.querySelectorAll(".colors-list li")

// Loop On All li
colorsli.forEach(li => {

    // Click on every list-item
    li.addEventListener("click", (e) => {

        // Set Color On Root
        document.documentElement.style.setProperty(`--main-color`, e.target.dataset.color)

        // Set Color On Local Storage 
        localStorage.setItem("color-option", e.target.dataset.color)

        handleActive(e);

    })
})


//Switch Radom Backgrounds Option
const randomBackEl = document.querySelectorAll(".random-backgrounds")

randomBackEl.forEach(span => {

    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === `yes`) {
            BackgroundOption = true;
            randomizeImgs()

            localStorage.setItem("background_option", true)

        } else {
            BackgroundOption = false;
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option", false)

        }

    })
})

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page")

// Get Array Of Images
let imagsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]



// Function To Randomize Imgs
function randomizeImgs() {
    if (BackgroundOption === true) {
        backgroundInterval = setInterval(() => {

            // Get Random Number 
            let randomNumber = Math.floor(Math.random() * imagsArray.length)

            // Change Background Image Url
            landingPage.style.backgroundImage = `url("imgs/` + imagsArray[randomNumber] + `")`;

        }, 2000)
    }

}
randomizeImgs()


let ourSkills = document.querySelector(".skills");
window.onscroll = function() {

    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        })
    }
}



let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img => {

    img.addEventListener(`click`, (e) => {

        let overlay = document.createElement("div")

        overlay.className = "popup-overlay"

        document.body.appendChild(overlay)

        let popupBox = document.createElement("div")

        popupBox.className = "popup-box"

        if (img.alt !== null) {

            let imgHeading = document.createElement("h3")

            let imgText = document.createTextNode(img.alt)

            imgHeading.appendChild(imgText)

            popupBox.appendChild(imgHeading)

        }

        let popupImage = document.createElement("img")

        popupImage.src = img.src;

        popupBox.appendChild(popupImage)

        document.body.appendChild(popupBox)



        let closeButton = document.createElement("span")

        let closeButtonText = document.createTextNode("X")

        closeButton.appendChild(closeButtonText)

        closeButton.className = `close-button`;

        popupBox.appendChild(closeButton)

    })
})

document.addEventListener("click", function(e) {

    if (e.target.className == `close-button`) {

        e.target.parentNode.remove();

        document.querySelector(".popup-overlay").remove();
    }
})


// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet")

allBullets.forEach(bullet => {

        bullet.addEventListener("click", (e) => {

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: `smooth`
            })
        })
    })
    //     // Select All Links
    // const allLinks = document.querySelectorAll(".links a")

// allLinks.forEach(link => {

//     link.addEventListener("click", (e) => {

//         e.preventDefault();

//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: `smooth`
//         })
//     })
// })


// Another method

const allLinks = document.querySelectorAll(".links a")

function scrollToSomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: `smooth`
            })
        })
    })
}

scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev) {
    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(Element => {
            Element.classList.remove("active")
        })
        //Add Active Class On Self
    ev.target.classList.add('active')
}

let bulletsSpan = document.querySelectorAll(".bullets-option span")
let bulletsContainer = document.querySelector(".nav-bullets")

let bulletLocalItem = localStorage.getItem("bullets_option")

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    })
    if (bulletLocalItem === `block`) {
        localStorage.setItem("bullets_option", `block`)

    } else {
        localStorage.setItem("bullets_option", `none`)
    }


}

bulletsSpan.forEach(span => {
        span.addEventListener("click", (e) => {

            if (span.dataset.display === `show`) {
                bulletsContainer.style.display = `block`

                localStorage.setItem("bullets_option", `block`)
                document.querySelector(".bullets-option .yes").classList.add("active")

            } else {
                bulletsContainer.style.display = `none`

                document.querySelector(".bullets-option .no").classList.add("active")

            }
            handleActive(e)
        })
    })
    // Reset Button
document.querySelector(".reset-options").onclick = function() {

    // localStorage.clear();
    localStorage.removeItem("bullets_option")
    localStorage.removeItem("color_option")
    localStorage.removeItem("background_option")
    window.location.reload();
}

//Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu")
let tiLinks = document.querySelector(".links")

toggleBtn.onclick = function() {

    // e.stopPropagation();

    this.classList.toggle("menu-active");
    tiLinks.classList.toggle("open");
}

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tiLinks) {

        // Check If Menu Is Open
        if (tiLinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");

            tiLinks.classList.toggle("open");
        }

    }

})