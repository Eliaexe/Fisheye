// FILTER TAGS
class Filter {
    // DISPLAY ALL THE FILTER 
    displayer(data) {
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
    style() {
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
