const buttonEditar = document.querySelectorAll(".editar-produto");
const buttonSair = document.querySelector(".button-sair");
const buttonAtt = document.querySelector("#atualizar-produto");
const popup = document.querySelector(".popup");
let produtoSelecionado;

buttonEditar.forEach(button => {
    button.addEventListener("click", function(event){
        popup.style.display = "flex";
        let produtoSelecionado = event.target.parentElement;
        
        buttonAtt.addEventListener("click", function(event){
            event.preventDefault();
            if (document.querySelector("#editar_titulo").value != " "){
                let h1 = produtoSelecionado.children[0];
                h1.textContent = document.querySelector("#editar_titulo").value
            } if (document.querySelector("#editar_preco").value != " "){
                let span = produtoSelecionado.children[2];
                span.textContent = document.querySelector("#editar_preco").value
            }
            popup.style.display = "none"
        });
    });
});
buttonSair.addEventListener("click", function(){
    popup.style.display = "none"
})



async function cadastrar(event) {
    event.preventDefault();

    const name     = document.getElementById('name').value;
    const email    = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const CPF      = document.getElementById('cpf_number').value;

    const data = {name, email, password, CPF};

    //console.log(data); (testei para ver se estava preenchendo os valores corretamente ao inspecionar, e deu tudo certo!)

    const response = await fetch('http://localhost:3000/usuario/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    

    const results = await response.json();

    if (results.success) {
        alert(results.message);
    } else {
        alert(alert.message);
    }
}


 
async function logar(event) {
    event.preventDefault();

    const email    = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;

    const data = { email, password }

    const response = await fetch("http://loalhost:3000/login", {
          method: "POST",
          headers: {
                "Content-Type":"application/json"
          },
          body: JSON.stringify(data)
    })

    let results = await response.json();

    if(results.success) {
          let userData = results.data;

          localStorage.setItem('informacoes', JSON.stringify(userData))
          let html  = document.getElementById('irformacoes')
          let dados = JSON.parse(localStorage.getItem('informacoes'))
          console.log(dados)

          html.innerHTML = `<div style="display: flex flex-direction: colum; align-items: end">
                               Perfil: ${dados.perfil}
                            </div>`

          html.style.display = 'block'

          dados.perfil === 'admin'
            ? document.getElementById('cadastrar_produtos').style.display = 'block'
            : document.getElementById('cadastrar_produtos').style.display = 'none'

          alert(results.message)
    } else {
          alert(results.message)
    }
}


function isUserAdmin() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            return decodedToken.role === 'admin';
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
            return false;
        }
    }
    return false;
};