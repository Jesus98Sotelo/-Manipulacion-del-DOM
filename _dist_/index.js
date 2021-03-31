/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector('#app');

appNode.addEventListener('click', (event) => {
    if (event.target.nodeName === 'H2') {
        window.alert("Hello");
    }
});
//Intl
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('es-MX', {
        style: "currency",
        currency:"MXN"
    }).format(price)
    return newPrice;
};
//web api
//conectarnos al servidor
window
    .fetch(`${baseUrl}/api/avo`)
    //procesar la respuesta y convertirla en JSON
    .then(respuesta => respuesta.json())
    // JSON -> Data -> Renderizar info browser
    .then((responseJeson) => {
        const todosLosItems = [];
        responseJeson.data.forEach((item) => {
            //crear imagen
            const imagen = document.createElement('img');
            imagen.src = `${baseUrl}${item.image}`;
            imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
            // crear titulo
            const title = document.createElement('h2');
            title.textContent = item.name;
            title.className = "text-xl text-red-600";
            // crear precio
            const price = document.createElement('div');
            price.textContent = formatPrice(item.price);
            price.className = "text-green-600";
            // Creamos un contenedor el título y el precio
            const priceAndTitle = document.createElement("div")
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);
            // Metemos todo dentro del contenedor principal
            const container = document.createElement('div')
            container.append(imagen, title, price);

            todosLosItems.push(container);
        });
    appNode.append(...todosLosItems);
});