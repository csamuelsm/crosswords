var userLang = getGameLang() || 'en';

async function fetchTexts(json_name) {
    const response = await fetch(json_name);
    const json = await response.json();
    return json;
}

function createTexts(lang) {
    fetchTexts("assets/languages/"+lang+".json").then(textos => {
        $('.title_top').html(textos['title']);
        $('title').html(textos['title']);

        //ONBOARDING
        $('#onboarding-1 .modal-body h6 strong').html(textos['title']);
        $('#onboarding-1 .modal-body .onboarding-text').html(textos['onboarding_1']);

        $('#onboarding-2 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-2 .modal-body .onboarding-text').html(textos['onboarding_2'])

        $('#onboarding-3 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-3 .modal-body .onboarding-text').html(textos['onboarding_3'])

        $('#onboarding-4 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-4 .modal-body .onboarding-text').html(textos['onboarding_4'])

        $('#onboarding-5 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-5 .modal-body .onboarding-text').html(textos['onboarding_5'])

        $('#onboarding-6 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-6 .modal-body .onboarding-text').html(textos['onboarding_6'])

        $('#onboarding-7 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-7 .modal-body .onboarding-text').html(textos['onboarding_7'])

        $('.change_dir_key_img').attr('src', textos['change_dir'])
        $('.boosters_keys_img').attr('src', textos['booster_keys'])

        $('.how_to_play').html(textos['how_to_play']);
        $('.lets_go').html(textos['lets_go']);
        $('.next').each((index, element) => {
            $(element).html(textos['next']);
        })

        $('.onboarding-dica').each((index, element) => {
            $(element).html(textos['dica']);
        })

        //stats
        $('.stats_share').html(textos['share']);
        $('.stats_streak').html(textos['stats_streak']);
        $('.stats_best').html(textos['stats_best']);
        $('.stats_tries').html(textos['stats_tries']);
        $('.stats_challenges').html(textos['stats_played']);
        $('.countdown_text').html(textos['next_game']);
        $('.finished_text').html(textos['congrats']);
        $('.finished_title').html(textos['finished']);

        //QUIT
        $('#quit h6 strong').html(textos['quit']);
        $('#quit_button').html(textos['quit']);
        $('#quit .modal-body p').html(textos['quit_text']);
        $('#quit .desistir-button').html(textos['yes']);
        $('#quit .no-button').html(textos['no']);

        //SETTINGS
        $('#configuracoes h6 strong').html(textos['settings']);
        $('#configuracoes .modal-body p').html(textos['settings_text']);
        $('#configuracoes .yes-button').html(textos['settings_save']);

        //banners
        $('#ep_banner1').attr('src', textos['banner']);
        $('#ep_banner2').attr('src', textos['banner']);
        $('#ep_banner3').attr('src', textos['banner']);
    })
}

$(document).ready(function(){
    if (!api.get("lang"))
    {
        // Cookies de linguagem não estão setados
        if (/^en\b/.test(userLang)) {
            $('.language-selector option[value="en"]').prop("selected", true)
            api.set("lang", "en")
            setGameLang("en")
            createTexts("en")
        } else if (/^pt\b/.test(userLang)) {
            $('.language-selector option[value="pt"]').prop("selected", true)
            api.set("lang", "pt")
            setGameLang("pt")
            createTexts("pt")
        } else if (/^de\b/.test(userLang)) {
            $('.language-selector option[value="de"]').prop("selected", true)
            api.set("lang", "de")
            setGameLang("de")
            createTexts("de")
        } else {
            $('.language-selector option[value="en"]').prop("selected", true)
            api.set("lang", "en")
            setGameLang("en")
            createTexts("en")
        }
    } else {
        // Cookies de linguagem estão setados
        let lang = api.get("lang")
        if (lang == "en") {
            $('.language-selector option[value="en"]').prop("selected", true)
            createTexts("en")
        } else if (lang == "pt") {
            $('.language-selector option[value="pt"]').prop("selected", true)
            createTexts("pt")
        } else if (lang == "de") {
            $('.language-selector option[value="de"]').prop("selected", true)
            createTexts("de")
        } else {
            $('.language-selector option[value="en"]').prop("selected", true)
            createTexts("en")
        }
    }

    // SELECTING LANGUAGEM FROM MODAL
    $('#configuracoes .yes-button').on('click', function() {
        // TODO: pegar linguagem selecionada, setar o cookie lang e reiniciar pagina
        let selected_lang = $('.language-selector').children("option:selected").val()
        if (selected_lang == "en") {
            api.set("lang", "en")
            setGameLang("en")
        } else if (selected_lang == "pt") {
            api.set("lang", "pt")
            setGameLang("pt")
        } else if (selected_lang == "de") {
            api.set("lang", "de")
            setGameLang("de")
        } else {
            api.set("lang", "en")
            setGameLang("en")
        }
        location.reload()
    })
})