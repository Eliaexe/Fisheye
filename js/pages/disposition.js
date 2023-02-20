class Disposition{
    order(data){
        const id = window.location.search.split('id=')[1];
        let items = (data.media.filter(item => item.photographerId == id));
        let flash = document.getElementById("ph-works");
        let sortBtn = Array.from(document.querySelectorAll('[role="option"]'));
        let sorted = ''

        sortBtn.forEach(e => {
            e.addEventListener('click', () =>{
                if(e.innerText === "Popularité"){
                    let Pop = items.sort((a,b) => {
                        return b.likes - a.likes;
                    })
                    sorted = Pop
                    } else if(e.innerText === "Date"){
                        let Dat = items.sort((a, b) => {
                            return new Date(a.date).valueOf() - new Date(b.date).valueOf();
                        })
                        sorted = Dat
                    } else if(e.innerText === "Tître"){
                    let Tit = items.sort((a, b) => a.title.localeCompare(b.title));
                    sorted = Tit
                    }
                    items = sorted
                    flash.innerHTML = ''
            new postFactory().bulidingPost(items);        
            new Carousel().init();
            })
        })
        return items
    }
}