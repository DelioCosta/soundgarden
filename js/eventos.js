const eventsContainer = document.querySelector('#events-container');

function createElementFromEvent(data){
    data.forEach((event) => {
        // cria o article
        const article = document.createElement('article');
        article.classList.add('evento');
        article.classList.add('card');
        article.classList.add('p-5');
        article.classList.add('m-3');

        // cria o card do evento

        const h2 = document.createElement('h2');
        const Name = event.name;
        const Date = event.scheduled.substring(0, 10).replaceAll('-', '/');
        h2.innerText = Name + " - " + Date;

        const h4 = document.createElement('h4');
        h4.innerText = event.attractions.join(', ');

        const p = document.createElement('p');
        p.innerText = event.description;

        const linkButton = document.createElement('a');
        linkButton.classList.add('btn');
        linkButton.classList.add('btn-primary');
        linkButton.innerText = 'reservar ingresso';

        // insere os elementos no card

        article.append(h2, h4, p, linkButton);

        // cira o container do card

        const divContainer = document.createElement('div');
        divContainer.setAttribute('id', 'div-container');

        // insere o card no container
        eventsContainer.append(article);
    })
};


fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
    "method": "GET",
}).then(response => { return response.json() }
).then(data => createElementFromEvent(data)
).catch(error => console.log(error));
