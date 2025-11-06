/*Aquí pongo mis variables*/

const apiUrl = "https://api.spaceflightnewsapi.net/v4/articles/?limit=5"; /*Pido noticias de space flight limitando a 5 encabezados*/
const newsContainer = document.getElementById("news-container");
const refreshBtn = document.getElementById("refreshBtn"); /*para actualizar las noticias*/

async function getNews() {
    newsContainer.innerHTML = "<p>Cargando noticias...</p>";
    try {
        /*sirve para hacer una solicitud a un servidor o API y traer datos*/
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Error al obtener las noticias");
        }

        /*la convertimos en un objeto JavaScript para poder leerlo, se cumple el formato json*/
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            newsContainer.innerHTML = "<p>No hay noticias disponibles :(</p>";
            return;
        }

        showNews(data.results);
    } catch (error) {
        newsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function showNews(articles) {
    newsContainer.innerHTML = "";

    /*se crea y muestra cada noticia*/
    articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("article");

        /*el título*/
        const title = document.createElement("h2");
        title.textContent = article.title;
        title.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        /*aquí va la descripción*/
        const description = document.createElement("p");
        description.textContent = article.summary || "Sin descripción";

        newsItem.appendChild(title);
        newsItem.appendChild(description);

        newsContainer.appendChild(newsItem);
    });
}

refreshBtn.addEventListener("click", getNews); /*para actualizar las noticias*/
getNews();
