function navegar(page) {

    localStorage.setItem("currentPage", page);

    fetch(`modulo/${page}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error loading page: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            const main = document.getElementById("main");
            const navbarList = document.getElementById("navbar_list");
          
            main.innerHTML = html;

            // Asignar margen diferente según el archivo cargado
            if (page === "inicio.html") {

                main.style.marginTop = "400px";
                navbarList.style.color = "white"
    

            } else {
                main.style.marginTop = "100px";
                navbarList.style.color = "black";
                
            }
        })
        .catch((error) => {
            console.error(error);
            document.getElementById('main').innerHTML =
                `
                <h2>Error</h2>
                <p>Sorry, the requested page could not be loaded.</p>
            `;
        });
}


window.onload = () => {

    const savedPage = localStorage.getItem("currentPage") || "inicio.html";
    navegar(savedPage);
};

document.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
        
        let selectedId = li.id;
        navegar(selectedId);
    });
});
