// DISPLAY ALL PHOTOGRAPHERS BY DEFAULT
class HomePage {
    // Build the photographers section, call the 'filter' function and the 'passer au contenu' button
    display(data) {
        let photographers = data.photographers;
        photographers.map(photographe => {
            let section = document.getElementById('photographers');
            let article = document.createElement('article');
            article.className = photographe.tags.join(' ') + ' articlePh';
            let template = `
                <a href="/photographer.html?id=${photographe.id}" title="${photographe.name}" tabindex="1" aria-label="Link to the ${photographe.name} photographer page">
                    <figure>
                        <img src="resources/img/portrait/${photographe.portrait}" alt="${photographe.alt}">
                        <figcaption class="name">${photographe.name}</figcaption>
                    </figure>
                </a>
                <p class="location">${photographe.city}, ${photographe.country}</p>
                <p class="tagline">${photographe.tagline}</p>
                <p class="price">${photographe.price}€/jour</p>
                <ul class="filter">${photographe.tags.map(tag =>
                    `<li data-filter="${tag}">#${tag}</li>`).join(" ")}</ul> 
                `
            section.appendChild(article);
            article.innerHTML = template;
        })
        new Filter().style();
        new Filter().displayer(data);
    }
}
