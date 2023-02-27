class Carousel{
    constructor() {
        this.index = +0;
    }

    handleFocus = (value, x) => {
        let box = document.querySelectorAll('.focusable')
        box.forEach(e => {
            if (value == false) {
                e.tabIndex = -1;
            } else if (value == true) {
                e.tabIndex = 0;
                document.getElementById(x).focus()
            }
        })        
    }

    init(){
        let page = document.querySelectorAll(".ph-media")
        let close = document.getElementById("close");
        let back = document.getElementById("back")
        let next = document.getElementById("next")
        let figure = document.getElementById('figure')
        let lightbox = document.getElementById('works-lightbox')

        const changeMedia = () => {
            figure.innerHTML = ''
            let media = document.getElementById(this.index).childNodes[0].cloneNode()
            if (media.nodeName == 'VIDEO') { media.controls = true; media.tabIndex = 0 }
            let figcaption = document.createElement('figcaption')
            figure.appendChild(media)
            figcaption.setAttribute('id', 'works-lightbox-name')
            figcaption.innerText = document.getElementById(this.index).getAttribute('data-name') 
            figure.appendChild(figcaption)
        }

        for (let i = 0; i < page.length; i++){
            page[i].setAttribute('id', i) 
        }

        const handleGoPrevius = () => {
            this.index -= 1 
            if (this.index < 0){
                this.index += page.length
                changeMedia(this.index)
            } else { changeMedia(this.index) }
        }
        const handleGoNext = () => {
            this.index += +1
            if (this.index > page.length - 1){
                this.index -= page.length
                changeMedia(this.index)
            } else { changeMedia(this.index) }
        }

        const handleExit = () => {
            lightbox.style.display = 'none';
            page.forEach( e => {
                if (e.nodeName == 'VIDEO' && e.controls == true) { e.controls = false }
            })
        }
        
        const handleOpenLightBox = (e) => {
            this.handleFocus(false)
            lightbox.style.display = 'flex';
            this.index = Number(e.getAttribute("id"))
            changeMedia(this.index)
            close.addEventListener("click", () => {this.handleFocus(true, e.id)})
        }
        
        page.forEach(e => { e.addEventListener("click", () => { handleOpenLightBox(e) })});
        back.addEventListener("click", () => { handleGoPrevius() })
        next.addEventListener("click", () => { handleGoNext() })
        close.addEventListener("click", () => { handleExit() })

        this.handleKeyNav()
    }

    // KEYBOARD NAVIGATION
    handleKeyNav(){
        document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
            console.log(e.keyCode);
            if (e.keyCode == '38' || e.keyCode == '39' ) {
                next.click()
            }
            else if (e.keyCode == '40' || e.keyCode == '37') {
                back.click()
            } else if (e.keyCode == '13') {
                document.activeElement.click()
            } else if (e.keyCode == '27') {
                close.click()
            }
        }
    }
}