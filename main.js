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
class HomePage {
    // Build the photographers section, call the 'tags' function and the 'passer au contenu' button
    photographers(data) {
            let photographers = data.photographers;
            photographers.map(photographe => {
                        let section = document.getElementById('photographers');
                        let article = document.createElement('article');
                        article.className = photographe.tags.join(' ') + ' card';
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

            section.appendChild(article);
            article.innerHTML = templatePhotographer;
        })
        new Filter().tags();
    }
}

// FUNCTION FILTER TAGS
class Filter {
    // FILTER TAGS
    tags() {
        let filtres = document.querySelector('ul');
        let articles = document.querySelectorAll('.card');

        // EVENT LISTENER ON CLICK LI
        filtres.addEventListener('click', event => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('actived')) {
                event.target.classList.add('actived')
            } else {
                event.target.classList.remove('actived')
            }

            this.sortArticle(articles);
        });
    }


    // retrieve the filters with the 'actived' class and place them in the 'filterSelected' array    
    activeFilter() {
        let currentFilters = document.querySelectorAll('ul li.actived');
        let filterSelected = [];

        currentFilters.forEach(function (currentFilter) {
            filterSelected.push(currentFilter.getAttribute("data-filter"));
        });

        return filterSelected;
    }

    // compare/check if 'filters' has the same value as the 'article' class    
    allFilters(article) {
        let filters = this.activeFilter();
        let classValue = article.classList.value;
        let classes = classValue.split(' ');
        let intersection = filters.filter(
            x => classes.includes(x)
        );

        return filters.length == intersection.length;
    }

    // SHOW OR HIDE ARTICLES
    sortArticle(articles) {
        articles.forEach((article) => {
            if (this.allFilters(article)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }
}

function display() {
    new ApiFishEye().getDataFishEye().then((data) => {
        if (window.location.pathname.includes("/photographers.html")) {

            // DROPDOWN MENU
            new DropDownMenu().dropDown(data);

            //PHOTOGRAPHER GALLERY & LIKES BOX
            new MediaBuilder().photographersMedias(data);
            return
        }
        // HOMEPAGE (PHOTOGRAPHERS, SCROLL, FILTER)
        new HomePage().photographers(data);
    }).catch(() => {
        console.error('Failed to load ApiFishEye');
    })
}

display()