const wrapper = document.querySelector(".wrapper") // Pesco il mio div principale, ovvero il wrapper
form = document.querySelector("form") // Pesco il mio form, la zona del mio QR Code
fileInput = form.querySelector("input") // Con questo pesco l'input type file presente nel mio form
infoText = form.querySelector("p"); // Questa è la descrizione del QR Code
copyBtn = wrapper.querySelector(".copy") // Questa è la classe del copy Text button


/**
 * Funzione per far leggere il QR Code immesso dall'utente
 * da questa funzione ne scaturisce un'array di questo QR Code letto e immesso dall'utente
 * @param {object} formData 
 */
function fetchRequest(formData, file) {
    /* Appendo a infoText la preparazione al QR Code */
    infoText.innerHTML = "Scanning QR Code..."
    /* nel fetch faccio la richiesta al QR Server API */
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData // richiesta con metodo post, utilizzo come body formData
    })
        /* In questo modo ottengo il responso, in formato json */
        .then(res => res.json()).then(result => {
            result = result[0].symbol[0].data // Questo è il mio QR Code
            console.log(result); // Verifica del risultato
            wrapper.querySelector("textarea").innerHTML = result // nella text area metto il testo della mia query
            infoText.innerHTML = "Upload QR Code to Scan"
            console.log(result); /* Verifica in console log del risultato */
            form.querySelector("img").src = URL.createObjectURL(file) // Al src della mia immagine appendo il QR
            wrapper.classList.add("active") // al mio wrapper gli lascio, tramite classList la classe active
        })
}

/* Evento necessario per analizzare il tipo di immagine che viene caricata */
fileInput.addEventListener("change", e => {
    let file = e.target.files[0] // questo è il file che carico
    console.log(file); // verifica in console
    let formData = new FormData(); // Crea un nuovo oggetto Form Data
    formData.append("file", file) // Appendo al mio nuovo oggetto il file caricato da utente
    fetchRequest(formData, file) // invoco la mia function con parametro formData
})

copyBtn.addEventListener("click", () => {
    /* console.log("Sono il pulsante copy"); */
    let text = wrapper.querySelector("textarea").textContent // Prendo il valore della textarea, ovvero il valore del QR
    navigator.clipboard.writeText(text) // Salvo la variabile di testo nella clipboard, ovvero ne prendo il valore
})




/* 
Aggiunto un evento al mio form, che replica praticamente 
l'input type. Al click sull'immagine nuvoletta riesco a importare un'immagine. 
*/
form.addEventListener("click", () => fileInput.click())

