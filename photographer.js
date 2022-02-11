class Api {
    async getData() {
        let url = 'resources/data.json';
        let response = await fetch(url);
        let data = await response.json();

        const dataP = [...data.photographers];
        const dataM = [...data.media];
        const id = window.location.search.split('id=')[1];

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
            <article aria-label="Photographer Profil" class="ph-profil">
                <div class='ph-infos'>
                    <h2 id="ph-name">${photographers[0].name}</h2>
                    <p class="ph-city">${photographers[0].city}, ${photographers[0].country}</p>
                    <p class="ph-tagline">${photographers[0].tagline}</p>
                    <p >${photographers[0].tags.map(tag => `<a class="ph-tags" href="index.html">#${tag}</a>`).join(" ")}</p>
                </div>
                <button id="ph-contact" title='Contact Me'>Contactez-moi</button>
                <img src="resources/img/portrait/${photographers[0].portrait}" alt="${photographers[0].alt}">
            </article>
            `

        section.innerHTML = template;
    }
    openModal(){
        let btn = document.getElementById("ph-contact");
        let form = document.getElementById("form-dialog");
        let closeBtn = document.getElementById("close-form")

        btn.addEventListener("click", () =>{
            form.style.display="block";
        })
        closeBtn.addEventListener("click", () =>{
            form.style.display="none";
        })
    }
    controllData(){
        let prenom = document.getElementById("first-name");
        let nom = document.getElementById("last-name");
        let email = document.getElementById("email");
        let message = document.getElementById("message")
        let fnErr = document.getElementById("fn-err")
        let lnErr = document.getElementById("ln-err")
        let eErr = document.getElementById("e-err")
        let submit = document.getElementById("submit")

        const firstSecondNamePattern = /^([a-zA-Z ]){2,30}$/;
        const emailPattern = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,})$/;

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
                    console.log(nom.value, prenom.value, email.value)
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
        <a href='#' id="${element.id}" title="${element.title}">
        </a>
        <div class="ph-work-elt-text">
            <h2 class="ph-work-title">${element.title}</h2>
            <span class="ph-work-price">${element.price} €</span>
            <div class='ph-elt-like'>
            <span class="ph-work-like">
                <a class="like-counter">${element.likes}</a>
            </span>
            <i class="far fa-heart heart-btn" aria-label='likes' role="button" data-value="${element.likes}"></i>
            </div>
        </div>
        `
        postTag.innerHTML = post
        poisition.appendChild(postTag)
    }

    photoPost(element, photographer){
        let place = document.getElementById(element.id)
        let image = `<img src="resources/img/${photographer}/${element.image}" alt="${element.title}" role="button" class="ph-media">`
        place.innerHTML = image
    }

    videoPost(element, photographer){
        let place = document.getElementById(element.id);
        let video = `<video controls="controls" src="resources/img/${photographer}/${element.video}" alt="${element.title}" role="button" class="ph-media"></video>`
        place.innerHTML = video
    }

    bulidingPost(element){
        const id = window.location.search.split('id=')[1];
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
        let btn = document.getElementById("dropdownBtn");
        let icon1 = document.getElementById("dropdownIcon")
        let button = [btn, icon1]
        let list = document.getElementById("dropdownList")

        button.forEach(e => {
            e.addEventListener('click', () => {
                list.style.display = "block"
            })
        });
    }

    value(data){
        let sortBtn = Array.from(document.querySelectorAll('[role="option"]'));
        let btn = document.getElementById("dropdownBtn");
        let list = document.getElementById('dropdownList');

        sortBtn.forEach(e => {
            e.addEventListener('click', () =>{
                btn.innerHTML = e.innerText
                list.style.display = "none"
            })
        })
    }
}

class Disposition{
    order(data){
        const id = window.location.search.split('id=')[1];
        let items = (data.media.filter(item => item.photographerId == id));
        let btn = document.getElementById("dropdownBtn");
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
                    console.log(sorted);
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

    init(){
        let page = document.querySelectorAll(".ph-media")
        let media = document.getElementById("works-lightbox-media")
        let title = document.getElementById("works-lightbox-name")
        let close = document.getElementById("close");
        let back = document.getElementById("back")

        for (let i = 0; i < page.length; i++){
            page[i].setAttribute('id', i) 
        }

        page.forEach(e => {
            e.addEventListener("click", () =>{
            document.getElementById('works-lightbox').style.display = 'block';

            this.index = Number(e.getAttribute("id"))
            media.innerHTML = ""
            title.innerHTML = "";

                media.appendChild(document.getElementById(this.index).cloneNode())
                title.innerHTML = document.getElementById(this.index).cloneNode().getAttribute("alt");
            })
        });

        back.addEventListener("click", () =>{
            this.index -= 1
            media.innerHTML = ""
            title.innerHTML = "";
            if (this.index < 0){
                this.index += page.length
                media.appendChild(document.getElementById(this.index).cloneNode())
                title.innerHTML = document.getElementById(this.index).cloneNode().getAttribute("alt");
            } else {
                media.appendChild(document.getElementById(this.index).cloneNode())
                title.innerHTML = document.getElementById(this.index).cloneNode().getAttribute("alt");
            }
        })

        next.addEventListener("click", () =>{
            this.index += +1
            media.innerHTML = ""
            title.innerHTML = "";

            if (this.index > page.length - 1){
                this.index -= page.length
                media.appendChild(document.getElementById(this.index).cloneNode())
                title.innerHTML = document.getElementById(this.index).cloneNode().getAttribute("alt");
            } else {
                media.appendChild(document.getElementById(this.index).cloneNode())
                title.innerHTML = document.getElementById(this.index).cloneNode().getAttribute("alt");
            }
        })
        
        close.addEventListener("click", () =>{
            document.getElementById('works-lightbox').style.display = 'none';
        })
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

    click(){
        let heart = document.querySelectorAll(".heart-btn")
        let card = document.getElementById("likes")
        heart.forEach(e => {
            e.addEventListener("click", () => {
                if(e.classList.contains("clicked")){
                    e.classList.replace("fas", "far");
                    e.classList.remove("clicked");
                    ((e.previousElementSibling).children.item(0)).innerText = +(e.previousElementSibling).children.item(0).innerText -1
                    card.innerText = +card.innerText - 1;
                    
                } else {
                    e.classList.add("clicked");
                    e.classList.replace("far", "fas");
                    ((e.previousElementSibling).children.item(0)).innerText = +(e.previousElementSibling).children.item(0).innerText +1;
                    
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
            const id = window.location.search.split('id=')[1];
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
            new Like().click()

    }).catch(() => {
        console.error('Failed to load Api');
    })
}

app()