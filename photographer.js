class ApiFishEye {
    async getDataFishEye() {
        let url = 'resources/data.json';
        let response = await fetch(url);
        let data = await response.json();

        const dataPhotographers = [...data.photographers];
        const dataMedias = [...data.media];
        const id = window.location.search.split('id=')[1];
        const photographer = (data.photographers.filter(item => item.id == id).map(i => i.name));
        let photographerJob = data.media.filter(item => item.photographerId == id);

        return {
            'photographers': dataPhotographers,
            'media': dataMedias
        };
    }
}

class PhotographerProfil {
    // Check on which page the user is located, if the position corresponds with the photographer's "id", create the photographer's 'Profile' section
    displayPhotographerProfil(data) {
            let photographersData = data.photographers;
            const id = window.location.search.split('id=')[1];
            const photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);
            const sectionPhotographerProfil = document.getElementById('profil-header');
            const templatePhotographerProfil = `
            <article aria-label="Photographer Profil" class="profil">
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

        sectionPhotographerProfil.innerHTML = templatePhotographerProfil;
        /*new Modal().modal(photographersData);
        new Form().fields();*/
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
        let message = document.getElementById("message");
        let submit = document.getElementById("submit");


        let fnErr = document.getElementById("fn-err")
        let lnErr = document.getElementById("ln-err")
        let eErr = document.getElementById("e-err")
        let mErr = document.getElementById("m-err")
        let data = [fnErr, lnErr, eErr, mErr];

        let succes = ""
        const firstSecondNamePattern = /^([a-zA-Z ]){2,30}$/;
        const emailPattern = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,})$/;
        const messagePattern = /^([a-zA-Z ]){5,10000}$/;

        function controll(pattern, campo, errore) {
            campo.addEventListener('keyup', () => {
                console.log(succes);

                if (pattern.test(campo.value)) {
                    succes++
                    errore.setAttribute("id", "ciao")
        console.log(data);

                    errore.setAttribute("data-error-visible", false)
                } else {
                    errore.setAttribute("data-error-visible", true)
                }

                if (succes >= 3) {
                    submit.style.display = "block"
                } else {
                        submit.style.display = "none"
                }      
            })
        }


        controll(firstSecondNamePattern,prenom,fnErr)
        controll(firstSecondNamePattern,nom,lnErr)
        controll(emailPattern,email,eErr)
        //controll(messagePattern,message,mErr)

// terminare 


    }

}

class postFactory {
    formatPost(element){ 
        let mainPoisition = document.getElementById("ph-works");
        let postTag = document.createElement("article");
        postTag.classList.add("ph-work-elt")
        let postTemplate = `
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
        postTag.innerHTML = postTemplate
        mainPoisition.appendChild(postTag)
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

class DropDownMenu {
    // Events, open/close the dropDownMenu
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

    sortValue(){
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
        let flash = document.getElementById("ph-works")
        var observer = new WebKitMutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {

            if(btn.innerHTML == "Popularité"){
            let popularOrder = items.sort((a, b) => {
                return b.likes - a.likes
            })
            } else if(btn.innerHTML == "Date"){
            let dateOrder = items.sort((a, b) => { // SORT BY DATE 
                return new Date(a.date).valueOf() - new Date(b.date).valueOf();
            })
            } else if(btn.innerHTML == "Tître"){
            let titleOrder = items.sort((a, b) => a.title.localeCompare(b.title)
            );
            }
            flash.innerHTML = ''
            new postFactory().bulidingPost(items);
            });    
        });
        observer.observe(btn, { attributes: true, childList: true, characterData: true, subtree: true });
        return items
    }

}

class Carousel{

    constructor() {
        this.index = +0;
    }

    init(items){
        let page = document.querySelectorAll(".ph-media")
        let mediaPlace = document.getElementById("works-lightbox-media")
        let titlePlace = document.getElementById("works-lightbox-name")
        let close = document.getElementById("close");
        let back = document.getElementById("back")

        for (let i = 0; i < page.length; i++){
            page[i].setAttribute('id', i) 
        }

        page.forEach(e => {
            e.addEventListener("click", () =>{
            document.getElementById('works-lightbox').style.display = 'block';

            this.index = Number(e.getAttribute("id"))
            mediaPlace.innerHTML = ""
            titlePlace.innerHTML = "";

                mediaPlace.appendChild(document.getElementById(this.index).cloneNode())
                titlePlace.innerHTML = document.getElementById(this.index).cloneNode().getAttribute("alt");
            })
        });

        back.addEventListener("click", () =>{
            this.index -= 1
            mediaPlace.innerHTML = ""
            titlePlace.innerHTML = "";
            if (this.index < 0){
                this.index += page.length
                mediaPlace.appendChild(document.getElementById(this.index).cloneNode())
                titlePlace.innerHTML = document.getElementById(this.index).cloneNode().getAttribute("alt");
            } else {
                mediaPlace.appendChild(document.getElementById(this.index).cloneNode())
                titlePlace.innerHTML = document.getElementById(this.index).cloneNode().getAttribute("alt");
            }
        })

        next.addEventListener("click", () =>{
            this.index += +1
            mediaPlace.innerHTML = ""
            titlePlace.innerHTML = "";

            if (this.index > page.length - 1){
                this.index -= page.length
                mediaPlace.appendChild(document.getElementById(this.index).cloneNode())
                titlePlace.innerHTML = document.getElementById(this.index).cloneNode().getAttribute("alt");

            } else {
                mediaPlace.appendChild(document.getElementById(this.index).cloneNode())
                titlePlace.innerHTML = document.getElementById(this.index).cloneNode().getAttribute("alt");

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
        let price = items.map(item => item.price)
        let box = document.getElementById("box")
        let likes = document.createElement("span")
        let prices = document.createElement("span")
        likes.innerHTML = like.reduce((partial_sum, a) => partial_sum + a, 0);
        prices.id = "prices"
        likes.id = "likes"
        box.insertAdjacentElement("afterbegin", prices)
        box.insertAdjacentElement("afterbegin", likes)
        box.innerHTML +='<i class="fas fa-heart" aria-label="likes"></i>'
    }
    ciao(data){
        document.getElementById("prices").innerHTML
        const id = window.location.search.split('id=')[1];
        let photographer = data.photographers.filter(i => i.id == id)
        document.getElementById("prices").innerHTML += (photographer[0].price) + "€/Jour"
    }
    click(){
        let heart = document.querySelectorAll(".heart-btn")

        heart.forEach(e => {
            e.addEventListener("click", () => {
                if(e.classList.contains("clicked")){
                    e.classList.replace("fas", "far");
                    e.classList.remove("clicked");
                    ((e.previousElementSibling).children.item(0)).innerText = +(e.previousElementSibling).children.item(0).innerText -1
                } else {
                    e.classList.add("clicked");
                    e.classList.replace("far", "fas");
                    ((e.previousElementSibling).children.item(0)).innerText = +(e.previousElementSibling).children.item(0).innerText +1
                }
            })
        });
    }
}
function appDispatch() {
    new ApiFishEye().getDataFishEye().then((data) => {
        new DropDownMenu().sortValue();

            // PHOTOGRAPHER PROFIL HEADER
            new PhotographerProfil().displayPhotographerProfil(data);
            const id = window.location.search.split('id=')[1];
            let items = new Disposition().order(data)

            // DROPDOWN MENU
            new DropDownMenu().dropDown();
            new postFactory().bulidingPost(items);
            new Disposition();
            new PhotographerProfil().openModal();
            new PhotographerProfil().controllData();
            new Carousel().init(items);
            new Like().getNumbers(items);
            new Like().ciao(data);
            new Like().click()

            //PHOTOGRAPHER GALLERY & LIKES BOX
            //new MediaBuilder().photographersMedias(data);
            //return
        

    }).catch(() => {
        console.error('Failed to load ApiFishEye');
    })
}

appDispatch()