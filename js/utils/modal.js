class Modal{
    openModal(){
        let btn = document.getElementById("ph-contact");
        let form = document.getElementById("form-dialog");
        let closeBtn = document.getElementById("close-form")
        let nameForm = document.getElementById('headForm')
        let newHeading = document.createElement('h2');
        
        newHeading.innerText = document.getElementById('ph-name').innerText;
        nameForm.appendChild(newHeading);

        btn.addEventListener("click", () => {
            form.style.display="block";
            new Carousel().handleFocus(false)
        })

        closeBtn.addEventListener("click", () => {
            form.style.display="none";
            new Carousel().handleFocus(true, '0')
        })
    }

    controllData(){
        let prenom = document.getElementById("first-name");
        let nom = document.getElementById("last-name");
        let email = document.getElementById("email");
        let fnErr = document.getElementById("fn-err")
        let lnErr = document.getElementById("ln-err")
        let eErr = document.getElementById("e-err")
        let submit = document.getElementById("submit")

        const firstSecondNamePattern = /^([a-zA-Z ]){2,30}$/;
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        function controll(pattern, campo, errore) {
            submit.addEventListener('click', () => {
                errore.setAttribute("data-error-visible", false)
                if (pattern.test(campo.value)) {
                    errore.setAttribute("data-error-visible", false)
                    campo.classList.add("ok")
                } else {
                    errore.setAttribute("data-error-visible", true)
                    campo.classList.remove("ok")
                }
            })
        }

        function check () {
            controll(firstSecondNamePattern,prenom,fnErr)
            controll(firstSecondNamePattern,nom,lnErr)
            controll(emailPattern,email,eErr)
            submit.addEventListener('click', () =>{
                if (document.querySelectorAll(".ok").length == 3){
                    console.log(nom.value, prenom.value, email.value, "message sended")
                }
            })
        }
        check ()
    }
}