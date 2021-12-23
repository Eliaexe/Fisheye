class ApiFishEye {
    async getDataFishEye() {
        let url = 'resources/data.json';
        let response = await fetch(url);
        let data = await response.json();

        const dataPhotographers = [...data.photographers];
        const dataMedias = [...data.media];

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
            const sectionPhotographerProfil = document.getElementById('ph-profil-header');
            const templatePhotographerProfil = `
            <article aria-label="Photographer Profil" class="ph-profil">
                <div class='ph-infos'>
                    <h2>${photographers[0].name}</h2>
                    <p class="ph-city">${photographers[0].city}, ${photographers[0].country}</p>
                    <p class="ph-tagline">${photographers[0].tagline}</p>
                    <p >${photographers[0].tags.map(tag => `<a class="ph-tags" href="index.html">#${tag}</a>`).join(" ")}</p>
                </div>
                <button id="ph-contact" title='Contact Me'>Contactez-moi</button>
                <img src="resources/img/portrait/${photographers[0].portrait}" alt="${photographers[0].alt}">
            </article>
            `

        sectionPhotographerProfil.innerHTML = templatePhotographerProfil;
        new Modal().modal(photographersData);
        new Form().fields();
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
        let place = document.getElementById(element.id)
        let video = `<video controls="controls" src="resources/img/${photographer}/${element.video}" role="button" class="ph-media"></video>`
        place.innerHTML = video
    }

    bulidingPost(data){
        const id = window.location.search.split('id=')[1];
        const photographer = (data.photographers.filter(item => item.id == id).map(i => i.name));
        console.log(photographer);
    let photographerJob = data.media.filter(item => item.photographerId == id);
    console.log(photographerJob);
    photographerJob.forEach(element => {
        this.formatPost(element)
            if(element.image != undefined){
            this.photoPost(element, photographer)
            } else if (element.video != undefined) {
            this.videoPost(element, photographer)
            }
    });
    }
}


/* */

function appDispatch() {
    new ApiFishEye().getDataFishEye().then((data) => {
        new postFactory().bulidingPost(data);
            // PHOTOGRAPHER PROFIL HEADER
            new PhotographerProfil().displayPhotographerProfil(data);

            // DROPDOWN MENU
           // new DropDownMenu().dropDown(data);

            //PHOTOGRAPHER GALLERY & LIKES BOX
            //new MediaBuilder().photographersMedias(data);
            //return
        

    }).catch(() => {
        console.error('Failed to load ApiFishEye');
    })
}

appDispatch()