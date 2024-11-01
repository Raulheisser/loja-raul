async function cadastrar(event) {
    event.preventDefault();

    const name     = document.getElementById('name').value;
    const email    = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const CPF      = document.getElementById('cpf_number').value;

    const data = {name, email, password };

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
