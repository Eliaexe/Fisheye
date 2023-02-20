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
