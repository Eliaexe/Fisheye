// GET THE DATA FISH (PHOTOGRAPHERS & MEDIAS)
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

// DISPLAY ALL PHOTOGRAPHERS BY DEFAULT
class HomePageBuilder {
    // Build the photographers section, call the 'filtertags' function and the 'passer au contenu' button
    displayPhotographers(data) {
            let photographers = data.photographers;
            photographers.map(photographe => {
                        let sectionPhotographers = document.getElementById('photographers');
                        let articlePhotographers = document.createElement('article');
                        articlePhotographers.className = photographe.tags.join(' ') + ' articlePh';
                        let templatePhotographer = `
            <a href="photographer.html?id=${photographe.id}" title="${photographe.name}">
                <img src="resources/img/portrait/${photographe.portrait}" alt="${photographe.alt}">
                <h2 class="name">${photographe.name}</h2>
            </a>
            <p class="location">${photographe.city}, ${photographe.country}</p>
            <p class="tagline">${photographe.tagline}</p>
            <p class="price">${photographe.price}€/jour</p>
            <ul class="filter">${photographe.tags.map(tag =>
                `<li data-filter="${tag}">#${tag}</li>`).join(" ")}</ul> 
            `

            sectionPhotographers.appendChild(articlePhotographers);
            articlePhotographers.innerHTML = templatePhotographer;
        })
        new Filter().filterTags();
        new Scroll().scrollButton();
    }
}

// FUNCTION FILTER TAGS
class Filter {
    // FILTER TAGS
    filterTags() {
        let filtres = document.querySelector('ul');
        let articles = document.querySelectorAll('.articlePh');

        // EVENT LISTENER ON CLICK LI
        filtres.addEventListener('click', event => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('actived')) {
                event.target.classList.add('actived')
            } else {
                event.target.classList.remove('actived')
            }

            this.sortDomArticle(articles);
        });
    }

    // retrieve the filters with the 'actived' class and place them in the 'filterSelected' array    
    getActiveFilters() {
        let currentFilters = document.querySelectorAll('ul li.actived');
        let filterSelected = [];

        currentFilters.forEach(function (currentFilter) {
            filterSelected.push(currentFilter.getAttribute("data-filter"));
        });

        return filterSelected;
    }

    // compare/check if 'filters' has the same value as the 'article' class    
    ownAllFilters(article) {
        let filters = this.getActiveFilters();
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
            if (this.ownAllFilters(article)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }
}

function appDispatch() {
    new ApiFishEye().getDataFishEye().then((data) => {
        if (window.location.pathname.includes("/photographers.html")) {
            // PHOTOGRAPHER PROFIL HEADER
            new PhotographerProfil().displayPhotographerProfil(data);

            // DROPDOWN MENU
            new DropDownMenu().dropDown(data);

            //PHOTOGRAPHER GALLERY & LIKES BOX
            new MediaBuilder().photographersMedias(data);
            return
        }
        // HOMEPAGE (PHOTOGRAPHERS, SCROLL, FILTER)
        new HomePageBuilder().displayPhotographers(data);
    }).catch(() => {
        console.error('Failed to load ApiFishEye');
    })
}

appDispatch()