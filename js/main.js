// GET THE DATA FISH (PHOTOGRAPHERS & MEDIAS)
class Api {
    async getDataFishEye() {
        let url = 'resources/data.json';
        let response = await fetch(url);
        let data = await response.json();

        const photographers = [...data.photographers];
        const medias = [...data.media];

        return {
            'photographers': photographers,
            'media': medias
        };
    }
}

// FILTER TAGS

class Filter {
    // DISPLAY ALL THE FILTER 
    filterDisplayer(data) {
        let tags = data.photographers.map(x => x.tags)
        let tagsToDisplay = []
        let tagsContainer = document.getElementById('tagsList')
        tags.forEach(e => {
            for (let i = 0; i < e.length; i++) {
                const el = e[i];
                if (!tagsToDisplay.includes(el)) {
                    tagsToDisplay.push(el)
                tagsContainer.innerHTML += `<li data-filter="${el}" tabindex="0">#${el}</li>`
                }
            }
        });
    }
    // FILTER TAGS
    filter() {
        let filtres = document.querySelector('ul');
        let articles = document.querySelectorAll('.articlePh');

        const handlerTag = (e) => {
            let classValue = e.target.classList.value;
            if (-1 === classValue.indexOf('actived')) {
                e.target.classList.add('actived')
            } else {
                e.target.classList.remove('actived')
            }
            this.sortDomArticle(articles);
        }

        // EVENTLISTENER "CLICK AND ENTER KEY"
        filtres.addEventListener('click', event => { handlerTag(event) });
        filtres.addEventListener('keypress', event => { if (event.key == "Enter") { handlerTag(event) } });
    }

    activeFilters() {
        let currentFilters = document.querySelectorAll('ul li.actived');
        let filterSelected = [];

        currentFilters.forEach(function(currentFilter) {
            filterSelected.push(currentFilter.getAttribute("data-filter"));
        });
        return filterSelected;
    }

    // compare/check if 'filters' has the same value as the 'article' class    
    allFilters(article) {
        let filters = this.activeFilters();
        let classValue = article.classList.value;
        let classes = classValue.split(' ');
        let intersection = filters.filter(
            x => classes.includes(x)
        );

        return filters.length == intersection.length;
    }

    // SHOW OR HIDE ARTICLES
    sortDomArticle(articles) {
        articles.forEach((article) => {
            if (this.allFilters(article)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }
}

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
                <a href="photographer.html?id=${photographe.id}" title="${photographe.name} profile" tabindex="1" aria-label="Link to the ${photographe.name} photographer page">
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
        new Filter().filter();
        new Filter().filterDisplayer(data);
    }
}


function app() {
    new Api().getDataFishEye().then((data) => {
        // HOMEPAGE (PHOTOGRAPHERS, SCROLL, FILTER)
        new HomePage().display(data);
    }).catch(() => {
        console.error('Failed to load Api');
    })
}

app()