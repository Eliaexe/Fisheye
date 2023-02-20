class Api {
    async getData() {
        let url = './resources/data.json';
        let response = await fetch(url);
        let data = await response.json();
        
        const dataP = [...data.photographers];
        const dataM = [...data.media];

        return {
            'photographers': dataP,
            'media': dataM
        };
    }
}

new Api().getData().then((data) => {
    if (window.location.href.includes('photographer')) {
        new DropDown().value();
        // PHOTOGRAPHER PROFIL HEADER
        new PhotographerHeader().display(data);
        // DATA
        let items = new Disposition().order(data);
        // DROPDOWN MENU
        new DropDown().init();
        // BUILDING POST
        new postFactory().bulidingPost(items);
        // CHANGE ORDER
        new Disposition();
        // MODAL
        new Modal().openModal();
        new Modal().controllData();
        // CAROUSEL
        new Carousel().init();
        // LIKE
        new Like().getNumbers(items);
        new Like().price(data);
        new Like().clickLike();
    } else if (window.location.href.includes('index')) {
        new HomePage().display(data);
    }
}).catch(() => {
    console.error('Failed to load Api');
})