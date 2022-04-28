const main = async () => {
    const params = parseQueryString(window.location.search);
  
    if (!params.id) {
      window.location.replace("admin.html"); // se não receber um id volta pra página admin
    }
  
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
  
    const trLoading = document.createElement("tr");
    const tdLoading = document.createElement("td");
    tdLoading.setAttribute("colspan", 5);
    tdLoading.setAttribute("align", "center");
    tdLoading.append("Carregando reservas..."); //exibe que está carregando enquanto aguarda o Promisse.all
  
    trLoading.appendChild(tdLoading);
    tbody.appendChild(trLoading);
  
    const [dataEvent, dataBookings] = await Promise.all([  //faz as duas promisses ao mesmo tempo (paralelo) e garante que vai esperar todas terminarem
      fetch(`${BASE_URL}/events/${params.id}`).then((response) =>
        response.json()
      ),
      fetch(`${BASE_URL}/bookings/event/${params.id}`).then((response) =>
        response.json()
      ),
    ]);
  
    tbody.innerHTML = "";
  
    document.querySelector("#eventoNome").innerHTML = dataEvent?.name;
  
    if (dataBookings.length === 0) {
      const trNenhumaReserva = document.createElement("tr");
      const tdNenhumaReserva = document.createElement("td");
      tdNenhumaReserva.setAttribute("colspan", 5);
      tdNenhumaReserva.setAttribute("align", "center");
      tdNenhumaReserva.append("Nenhuma reserva encontrada");
  
      trNenhumaReserva.appendChild(tdNenhumaReserva);
      tbody.appendChild(trNenhumaReserva);
    }
  
    dataBookings.forEach((row, index) => {
  
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <th scope="row" width="20px">${index + 1}</th>
        <td>${new Date(row.created_at).toLocaleString("pt-br")}</td>
        <td>${row.owner_name}</td>
        <td>${row.owner_email}</td>
        <td>${row.number_tickets}</td>`;
  
      tbody.appendChild(tr);
    });
  };
  
  main();