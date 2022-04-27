const formSelector = document.querySelector('#formulario')
console.log(formSelector);

formSelector.addEventListener('submit', (event) => {
    event.preventDefault();

    const formObject = new FormData(formSelector);

    const attractionsArray = formObject.get('atracoes-input').split(', ');
  
    const body = {
        "name": formObject.get('nome-input'),
        "poster": "https://i.imgur.com/fQHuZuv.png",
        "attractions": attractionsArray,
        "description": formObject.get('descricao-input'),
        "scheduled": formObject.get('data-input'),
        "number_tickets": formObject.get('lotacao-input')
    }

    //console.log(body);

    fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify(body)
    }).then( response => console.log(response)
    ).then( ()=> {
        alert("Evento criado com sucesso!")

        setTimeout(function(){
            window.location.href = "/soundgarden/admin.html";
        }, 1000);
    }).catch( error => console.error(error) );

});
