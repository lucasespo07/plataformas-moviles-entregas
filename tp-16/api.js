

const URL_API = "https://api.worldbank.org/v2/country?format=json&per_page=300";

let listaPaises = [];

// Conectar con la API
async function obtenerPaisesDesdeApi() {

    const response = await fetch(URL_API);

    if (!response.ok) {
        throw new Error("Error al conectar con la API");
    }

    const data = await response.json();

    return data[1];
}

// Mostrar países
function mostrarPaises(paises) {

    const contenedor = document.querySelector("#contenedorPaises");

    contenedor.innerHTML = "";

    if (paises.length === 0) {
        document.querySelector("#mensaje").textContent =
            "No se encontraron países.";
        return;
    }

    document.querySelector("#mensaje").textContent =
        "Países encontrados: " + paises.length;

    paises.forEach(pais => {

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("col-12", "col-sm-6", "col-lg-4");

        // Obtener la bandera del país
        const bandera = pais.iso2Code
            ? `https://flagcdn.com/w160/${pais.iso2Code.toLowerCase()}.png`
            : "";

        tarjeta.innerHTML = `
            <div class="card shadow-sm h-100">

                <div class="card-body text-center">

                    <h5 class="card-title">${pais.name}</h5>

                    ${bandera ? `
                        <img
                            src="${bandera}"
                            alt="Bandera de ${pais.name}"
                            class="img-fluid rounded border mb-3"
                            style="width: 110px; height: 70px; object-fit: cover;"
                            loading="lazy"
                        >
                    ` : `
                        <p>Bandera no disponible</p>
                    `}

                    <p>Continente: ${pais.region.value}</p>

                    <button class="btn btn-primary"
                        onclick="mostrarDetalles('${pais.id}')">
                        Ver más información
                    </button>

                    <div class="detalles mt-3" id="detalle-${pais.id}"></div>

                </div>

            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// Mostrar detalles
function mostrarDetalles(id) {

    const pais = listaPaises.find(p => p.id === id);

    const detalle = document.querySelector("#detalle-" + id);

    if (detalle.style.display === "block") {
        detalle.style.display = "none";
        return;
    }

    detalle.innerHTML = `
        <p><strong>Nombre:</strong> ${pais.name}</p>
        <p><strong>Capital:</strong> ${pais.capitalCity || "No disponible"}</p>
        <p><strong>Región:</strong> ${pais.region.value}</p>
        <p><strong>Código:</strong> ${pais.iso2Code || "No disponible"}</p>
    `;

    detalle.style.display = "block";
}

// Buscar países
function buscarPaises() {

    const texto = document.querySelector("#buscador").value.toLowerCase();

    const resultados = listaPaises.filter(pais => {

        const nombre = pais.name.toLowerCase().includes(texto);

        return nombre;
    });

    mostrarPaises(resultados);
}

// Cargar países
async function cargarPaises() {

    document.querySelector("#spinner").style.display = "block";

    try {

        const datos = await obtenerPaisesDesdeApi();

        // Excluir agrupaciones que no son países
        listaPaises = datos.filter(pais =>
            pais.region.value !== "Aggregates" &&
            pais.name !== ""
        );

        listaPaises.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        mostrarPaises(listaPaises);

    } catch (error) {

        console.log(error);

        document.querySelector("#mensaje").textContent =
            "Error al cargar los países.";

    } finally {

        document.querySelector("#spinner").style.display = "none";

    }
}

// Evento del buscador
document.querySelector("#buscador")
    .addEventListener("input", buscarPaises);

// Iniciar el programa
cargarPaises();
