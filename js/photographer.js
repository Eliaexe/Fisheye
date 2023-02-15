class Api {
    async getData() {
        let url = 'resources/data.json';
        let response = await fetch(url);
        let data = await response.json();

        const dataP = [...data.photographers];
        const dataM = [...data.media];

        return {
            'photographers': dataP,
            'media': dataM
        };
    }
}

class PhotographerHome {
    display(data) {
            let photographersData = data.photographers;
            const id = window.location.search.split('id=')[1];
            const photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);
            const section = document.getElementById('ph-profil-header');
            const template = `
                <div class='ph-infos'>
                    <h2 id="ph-name">${photographers[0].name}</h2>
                    <p class="ph-city">${photographers[0].city}, ${photographers[0].country}</p>
                    <p class="ph-tagline">${photographers[0].tagline}</p>
                    <div id="tagsContainer"> ${photographers[0].tags.map(tag => `<p class="ph-tags">#${tag}</p>`).join(" ")} </div>
                </div>
                <button class="focusable" id="ph-contact" title='Contact Me' aria-label="Open the contact form modal">Contactez-moi</button>
                <img src="resources/img/portrait/${photographers[0].portrait}" alt="${photographers[0].alt}">
            `

        section.innerHTML = template;
    }
    openModal(){
        let btn = document.getElementById("ph-contact");
        let form = document.getElementById("form-dialog");
        let closeBtn = document.getElementById("close-form")
        let nameForm = document.getElementById('headForm')
        let newHeading = document.createElement('h2');
        
        newHeading.innerText = document.getElementById('ph-name').innerText;
        nameForm.appendChild(newHeading);

        btn.addEventListener("click", () => {
            form.style.display="block";
            new Carousel().handleFocus(false)
        })

        closeBtn.addEventListener("click", () => {
            form.style.display="none";
            new Carousel().handleFocus(true, '0')
        })
    }

    controllData(){
        let prenom = document.getElementById("first-name");
        let nom = document.getElementById("last-name");
        let email = document.getElementById("email");
        let fnErr = document.getElementById("fn-err")
        let lnErr = document.getElementById("ln-err")
        let eErr = document.getElementById("e-err")
        let submit = document.getElementById("submit")

        const firstSecondNamePattern = /^([a-zA-Z ]){2,30}$/;
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        function controll(pattern, campo, errore) {
            submit.addEventListener('click', () => {
                errore.setAttribute("data-error-visible", false)
                if (pattern.test(campo.value)) {
                    errore.setAttribute("data-error-visible", false)
                    campo.classList.add("ok")
                } else {
                    errore.setAttribute("data-error-visible", true)
                    campo.classList.remove("ok")
                }
            })
        }

        function check () {
            controll(firstSecondNamePattern,prenom,fnErr)
            controll(firstSecondNamePattern,nom,lnErr)
            controll(emailPattern,email,eErr)
            submit.addEventListener('click', () =>{
                if (document.querySelectorAll(".ok").length == 3){
                    console.log(nom.value, prenom.value, email.value, "message sended")
                }
            })
        }
        check ()
    }
}

class postFactory {
    formatPost(element){ 
        let poisition = document.getElementById("ph-works");
        let postTag = document.createElement("article");
        postTag.classList.add("ph-work-elt")
        let post = `
        <a><figure id="${element.id}" title="${element.title}" tabindex="0" class="ph-media focusable" aria-label="The name of the image is ${element.title}"></figure>
        <div class="ph-work-elt-text">
            <h2 class="ph-work-title">${element.title}</h2>
            <p class="ph-work-price">${element.price} €</p>
            <p class="like-counter">${element.likes}</p>
            <i class="far fa-heart heart-btn focusable" aria-label='like ${element.title}' role="button" data-value="${element.likes}" tabindex="0"></i>
        </div>
        `
        postTag.innerHTML = post
        poisition.appendChild(postTag)
    }

    photoPost(element, photographer){
        let place = document.getElementById(element.id)
        let image = `<img src="resources/img/${photographer}/${element.image}" alt="${element.title}" tabindex="-1">`
        place.innerHTML = image
    }

    videoPost(element, photographer){
        let place = document.getElementById(element.id);
        let video = `<video src="resources/img/${photographer}/${element.video}" alt="${element.title}" tabindex="-1"></video>`
        place.innerHTML = video
    }

    bulidingPost(element){
        let photographer = document.getElementById("ph-name").firstChild.nodeValue
        element.forEach(element => {
            this.formatPost(element)
                if(element.image != undefined){
                this.photoPost(element, photographer)
                } else if (element.video != undefined) {
                this.videoPost(element, photographer)
                }
        });
    }
}

class DropDown {
    dropDown() {
        let icon1 = document.getElementById("dropdownIcon")
        let list = document.getElementById("dropdownList")
        let icon2 = list.children[0]
        let box = document.querySelector('.button-wrapper')

        const handleOpenDropDown = () => {
            list.style.display = "block"
            icon1.classList.add('rotate')
            box.classList.add('border-modified')
        }

        const handleCloseDropDown = () => {
            list.style.display = "none"
            box.classList.remove('border-modified') 
            icon1.classList.remove('rotate')
        }

        box.addEventListener('click', () => { handleOpenDropDown() })
        icon2.addEventListener('click', () => { handleCloseDropDown() })
    }

    value(){
        let sortBtn = Array.from(document.querySelectorAll('[role="option"]'));
        let btn = document.getElementById("dropdownBtn");
        let list = document.getElementById('dropdownList');
        let box = document.querySelector('.button-wrapper')
        let icon1 = document.getElementById("dropdownIcon")

        sortBtn.forEach(e => {
            e.addEventListener('click', () =>{
                btn.innerHTML = e.innerText 
                list.style.display = "none"
                box.classList.remove('border-modified')
                icon1.classList.remove('rotate')
            })
        })
    }
}

class Disposition{
    order(data){
        const id = window.location.search.split('id=')[1];
        let items = (data.media.filter(item => item.photographerId == id));
        let flash = document.getElementById("ph-works");
        let sortBtn = Array.from(document.querySelectorAll('[role="option"]'));
        let sorted = ''

        sortBtn.forEach(e => {
            e.addEventListener('click', () =>{
                if(e.innerText === "Popularité"){
                    let Pop = items.sort((a,b) => {
                        return b.likes - a.likes;
                    })
                    sorted = Pop
                    } else if(e.innerText === "Date"){
                        let Dat = items.sort((a, b) => {
                            return new Date(a.date).valueOf() - new Date(b.date).valueOf();
                        })
                        sorted = Dat
                    } else if(e.innerText === "Tître"){
                    let Tit = items.sort((a, b) => a.title.localeCompare(b.title));
                    sorted = Tit
                    }
                    items = sorted
                    flash.innerHTML = ''
            new postFactory().bulidingPost(items);        
            new Carousel().init();
            })
        })
        return items
    }
}

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
            if (media.nodeName == 'VIDEO') { media.controls = true }
            let figcaption = document.createElement('figcaption')
            figure.appendChild(media)
            figcaption.setAttribute('id', 'works-lightbox-name')
            figcaption.innerText = document.getElementById(this.index).childNodes[0].cloneNode().getAttribute("alt") 
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

        document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;

            if (e.keyCode == '38' || e.keyCode == '39' ) {
                next.click()
            }
            else if (e.keyCode == '40' || e.keyCode == '37') {
                back.click()
            } else if (e.keyCode == '13') {
                document.activeElement.click()
            } else if (e.keyCode == '27') {
                close.click()
            } else if (e.keyCode == '9'){
                console.log(document.activeElement);
            }
        }
    }
}

class Like{
    getNumbers(items){
        let like = items.map(item => item.likes)
        let box = document.getElementById("box")
        let likes = document.createElement("span")
        let prices  = document.createElement("span")
        likes.innerHTML = like.reduce((partial_sum, a) => partial_sum + a, 0);
        prices .id = "prices "
        likes.id = "likes"
        box.insertAdjacentElement("afterbegin", prices )
        box.insertAdjacentElement("afterbegin", likes)
        box.innerHTML +='<i class="fas fa-heart" aria-label="likes"></i>'
    }

    card(data){
        document.getElementById("prices ").innerHTML
        const id = window.location.search.split('id=')[1];
        let photographer = data.photographers.filter(i => i.id == id)
        document.getElementById("prices ").innerHTML += (photographer[0].price) + "€/Jour"
    }

    clickLike(){
        let heart = document.querySelectorAll(".heart-btn")
        let card = document.getElementById("likes")
        heart.forEach(e => {
            e.addEventListener("click", () => {
                if(e.classList.contains("clicked")){
                    e.classList.replace("fas", "far");
                    e.classList.remove("clicked");
                    e.previousElementSibling.innerText = +e.previousElementSibling.innerText -1
                    card.innerText = +card.innerText - 1;                    
                } else {
                    e.classList.add("clicked");
                    e.classList.replace("far", "fas");
                    e.previousElementSibling.innerText = +e.previousElementSibling.innerText +1;
                    card.innerText = +card.innerText + 1;
                }
            })
        });
    }
}

function app() {
    new Api().getData().then((data) => {
        new DropDown().value();

            // PHOTOGRAPHER PROFIL HEADER
            new PhotographerHome().display(data);
            // DATA
            let items = new Disposition().order(data) 
            // DROPDOWN MENU
            new DropDown().dropDown();
            // BUILDING POST
            new postFactory().bulidingPost(items);
            // CHANGE ORDER
            new Disposition();

            // MODAL
            new PhotographerHome().openModal();
            new PhotographerHome().controllData();
            // CAROUSEL
            new Carousel().init();
            // LIKE
            new Like().getNumbers(items);
            new Like().card(data);
            new Like().clickLike()
    }).catch(() => {
        console.error('Failed to load Api');
    })
}

app()