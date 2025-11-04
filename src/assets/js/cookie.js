$(document).ready(function() {

    if (Cookies.get("cookieConsent") || Cookies.get("cookiePause")) {
        return; // Ne rien afficher si un cookie existe
    }

    // création des éléments de la bannière
    const $banniere = $(`
        <div id="cookie" class="fixed z-10 top-10 left-10 border border-black p-4">
            <h1>Ce site utilise des cookies pour améliorer votre expérience.</h1>
            <button id="acceptCookies" class="border border-black rounded-2xl p-2 m-2 cursor-pointer">J'accepte</button>
            <button id="rejectCookies" class="border border-black rounded-2xl p-2 m-2 cursor-pointer">Plus tard</button>
        </div>
    `);

    $('body').append($banniere);

    $("#acceptCookies").click(function() {
        // Cookies.set("nom", "valeur", { options });
        Cookies.set("cookieConsent", "true", { expires: 365 });
        $banniere.remove();
    });

    $("#rejectCookies").click(function() {
        Cookies.set("cookiePause", "true", {});
        $banniere.remove();

        // Attendre 5 secondes puis réafficher
        setTimeout(function() {
            $('body').append($banniere);
        }, 5000);
      });

    
});