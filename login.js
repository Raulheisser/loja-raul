async function logar(Event) {
    event.preventDefault();

    const email    = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;

    const data = { email, password }
    console.log(data)

    const response = await fetch("http://loalhost:3000/login", {
          method: "POST",
          headers: {
                "Content-Type":"application/json"
          },
          body: JSON.stringify(data)
    })

    let results = response.json();
    if(results.success) {
      console.log(results.data)
      alert(results.message)
    } else {
      alert(results.message)
    }

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
