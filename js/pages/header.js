class PhotographerHeader {
    display(data) {
            let photographersData = data.photographers;
            const id = window.location.search.split('id=')[1];
            const photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);
            const section = document.getElementById('ph-profil-header');
            const template = `
                <div class='ph-infos focusable' tabindex="0" aria-label="je m'appelle ${photographers[0].name} et j'habite a ${photographers[0].city} en ${photographers[0].country} et ma devise est ${photographers[0].tagline}">
                    <h2 id="ph-name">${photographers[0].name}</h2>
                    <p class="ph-city">${photographers[0].city}, ${photographers[0].country}</p>
                    <p class="ph-tagline">${photographers[0].tagline}</p>
                    <div id="tagsContainer"> ${photographers[0].tags.map(tag => `<p class="ph-tags">#${tag}</p>`).join(" ")} </div>
                </div>
                <div id="box" class="focusable" tabindex="0" aria-label=""></div>
                <button class="focusable" id="ph-contact" title='Contactez-moi' aria-label="ouvrir le formulaire de contact">Contactez-moi</button>
                <img src="resources/img/portrait/${photographers[0].portrait}" alt="${photographers[0].alt}">
            `
        section.innerHTML = template;
    }
}