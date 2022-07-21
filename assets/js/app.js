const wrapper = document.querySelector(".wrapper") // Pesco il mio div principale, ovvero il wrapper
form = document.querySelector("form") // Pesco il mio form, la zona del mio QR Code
fileInput = form.querySelector("input") // Con questo pesco l'input type file presente nel mio form

/* 
Aggiunto un evento al mio form, che replica praticamente 
l'input type. Al click sull'immagine nuvoletta riesco a importare un'immagine. 
*/
form.addEventListener("click", () => fileInput.click())

