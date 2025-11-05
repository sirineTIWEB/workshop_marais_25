$(document).ready(function () {

    if (Cookies.get("cookieConsent") || Cookies.get("cookieNo")) {
        return; // Ne rien afficher si un cookie existe
    }

    // création des éléments de la bannière
    const $banniere = $(`
        <div id="cookie" class="fixed z-10 top-10 left-10 border border-black p-4 flex flex-col items-end">
            <button id="PauseCookies" class="cursor-pointer">X</button>
            <h3>Ce site utilise des cookies pour améliorer votre expérience.</h3>
            <div>
                <button id="AcceptCookies" class="border border-black rounded-2xl p-2 m-2 cursor-pointer">J'accepte</button>
                <button id="RejectCookies" class="border border-black rounded-2xl p-2 m-2 cursor-pointer">Je refuse</button>
            </div>
            
        </div>
    `);

    $('body').prepend($banniere);

    $("#AcceptCookies").click(function () {
        // Cookies.set("nom", "valeur", { options });
        Cookies.set("cookieConsent", "true", { expires: 365 });
        $banniere.remove();
    });

    $("#PauseCookies").click(function () {
        $banniere.remove();

        // Attendre 5 secondes puis réafficher
        setTimeout(function () {
            $('body').append($banniere);
        }, 5000);

        // Pas de replay button, animation comme première fois
        // (l'animation continue normalement)
    });

    $("#RejectCookies").click(function () {
        Cookies.set("cookieNo", "no", {});
        $banniere.remove();

        // Pas de replay button si cookies refusés
        // L'animation continue comme première fois
    });


});