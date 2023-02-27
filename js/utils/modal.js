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
        let messageText = document.getElementById("message")
        let fnErr = document.getElementById("fn-err")
        let lnErr = document.getElementById("ln-err")
        let eErr = document.getElementById("e-err")
        let mErr = document.getElementById("m-err")
        let submit = document.getElementById("submit")

        let ariaNom = 'Insérez votre nom'
        let ariaPrenom = 'Insérez votre prenom'
        let ariaEmail = 'Insérez votre email'
        let ariaMessage ='Insérez votre message'


        const firstSecondNamePattern = /^([a-zA-Z ]){2,30}$/;
        const messagePattern = /^(?=.*\S).{8,}$/;
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        function controll(pattern, campo, errore, aria) {
            submit.addEventListener('click', () => {
                errore.setAttribute("data-error-visible", false)
                if (pattern.test(campo.value)) {
                    campo.attributes[0].value = aria
                    errore.setAttribute("data-error-visible", false)
                    campo.classList.add("ok")
                } else {
                    campo.attributes[0].value = errore.attributes[2].value
                    errore.setAttribute("data-error-visible", true)
                    campo.classList.remove("ok")
                }
            })
        }

        function check () {
            controll(firstSecondNamePattern,prenom,fnErr,ariaNom)
            controll(firstSecondNamePattern,nom,lnErr,ariaPrenom)
            controll(emailPattern,email,eErr,ariaEmail)
            controll(messagePattern, messageText, mErr, ariaMessage)
            submit.addEventListener('click', () =>{
                if (document.querySelectorAll(".ok").length == 4){
                    console.log(nom.value, prenom.value, email.value, "message sended")
                    document.getElementById('close-form').click()
                }
            })
        }
        check ()
    }
}