const wrapper = document.querySelector(".wrapper") // Pesco il mio div principale, ovvero il wrapper
form = document.querySelector("form") // Pesco il mio form, la zona del mio QR Code
fileInput = form.querySelector("input") // Con questo pesco l'input type file presente nel mio form

/**
 * Funzione per far leggere il QR Code immesso dall'utente
 * da questa funzione ne scaturisce un'array di questo QR Code letto e immesso dall'utente
 * @param {object} formData 
 */
function fetchRequest(formData) {
    /* nel fetch faccio la richiesta al QR Server API passando il mio formData come body e attendendo il responso */
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    })
        /* In questo modo ottengo il responso, in formato json */
        .then(res => res.json()).then(result => {
            /* Verifica in console log del risultato */
            console.log(result);
        })
}

/* Evento necessario per analizzare il tipo di immagine che viene caricata */
fileInput.addEventListener("change", e => {
    let file = e.target.files[0] // questo è il file che carico
    console.log(file); // verifica in console
    let formData = new FormData(); // Crea un nuovo oggetto Form Data
    formData.append("file", file) // Appendo al mio nuovo oggetto il file caricato da utente
    fetchRequest(formData) // invoco la mia function con parametro formData
})

/* 
Aggiunto un evento al mio form, che replica praticamente 
l'input type. Al click sull'immagine nuvoletta riesco a importare un'immagine. 
*/
form.addEventListener("click", () => fileInput.click())

