class DropDown {
    
    init() {
        let icon1 = document.getElementById("dropdownIcon")
        let list = document.getElementById("dropdownList")
        let icon2 = list.children[0]
        let box = document.querySelector('.button-wrapper')

        const handleOpenDropDown = () => {
            list.style.display = "block"
            icon1.classList.add('rotate')
            box.classList.add('border-modified')
        }

        const handleCloseDropDown = () => {
            list.style.display = "none"
            box.classList.remove('border-modified') 
            icon1.classList.remove('rotate')
        }

        box.addEventListener('click', () => { handleOpenDropDown() })
        icon2.addEventListener('click', () => { handleCloseDropDown() })
        
        this.choise()
    }

    value(){
        let sortBtn = Array.from(document.querySelectorAll('[role="option"]'));
        let btn = document.getElementById("dropdownBtn");
        let list = document.getElementById('dropdownList');
        let box = document.querySelector('.button-wrapper')
        let icon1 = document.getElementById("dropdownIcon")

        sortBtn.forEach(e => {
            e.addEventListener('click', () =>{
                let mainValue = btn.innerHTML
                let newValue = e.innerText
                e.innerHTML = mainValue
                btn.innerHTML = newValue
                list.style.display = "none"
                box.classList.remove('border-modified')
                icon1.classList.remove('rotate')
            })
        })
    }

    choise(){
        let choises = ['Popularité', 'Date', 'Tître']
        let list = document.getElementById('dropdownList');
        let btn = document.getElementById("dropdownBtn");

        btn.textContent =''
        list.children[0].textContent = ''
        list.children[0].textContent = ''

        btn.textContent = `${choises[0]}`
        list.children[0].textContent = `${choises[1]}`
        list.children[1].textContent = `${choises[2]}`
    }
}