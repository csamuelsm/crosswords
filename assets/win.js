function win_routine(){
    $('#quit_button').addClass("hide");
    $('.ep_banner_div').removeClass("hide");

    end_time = new Date();
    let seconds = Math.abs(start_time.getTime() - end_time.getTime())/1000;

    //cookies
    var wins;
    var win_streak;
    var best_streak;
    var played;
    var time;
    var best_time;
    finished = true;

    if (api.get(`${getGameLang()}_wins`)) {
        wins = parseInt(api.get(`${getGameLang()}_wins`))+1;
        api.set(`${getGameLang()}_wins`, parseInt(api.get(`${getGameLang()}_wins`))+1);
    }
    else {
        wins = 1;
        api.set(`${getGameLang()}_wins`, 1);
    }

    if (api.get(`${getGameLang()}_win_streak`)) {
        win_streak = parseInt(api.get(`${getGameLang()}_win_streak`))+1;
        api.set(`${getGameLang()}_win_streak`, parseInt(api.get(`${getGameLang()}_win_streak`))+1);
    }
    else {
        win_streak = 1;
        api.set(`${getGameLang()}_win_streak`, 1);
    }

    if(api.get(`${getGameLang()}_best_streak`)) {
        best_streak = api.get(`${getGameLang()}_best_streak`);
        if (parseInt(api.get(`${getGameLang()}_win_streak`)) > parseInt(api.get(`${getGameLang()}_best_streak`))) {
            best_streak = parseInt(api.get(`${getGameLang()}_win_streak`));
            api.set(`${getGameLang()}_best_streak`, parseInt(api.get(`${getGameLang()}_win_streak`)));
        }
    } else {
        best_streak = 1;
        api.set(`${getGameLang()}_best_streak`, 1);
    }

    if (api.get(`${getGameLang()}_played`)) {
        played = parseInt(api.get(`${getGameLang()}_played`))+1;
        api.set(`${getGameLang()}_played`, parseInt(api.get(`${getGameLang()}_played`))+1)
    } else {
        played = 1;
        api.set(`${getGameLang()}_played`, 1)
    }

    api.set(`${getGameLang()}_time`, parseInt(seconds));
    time = seconds;

    if(api.get(`${getGameLang()}_best_time`)) {
        best_time = api.get(`${getGameLang()}_best_time`);
        if (parseInt(api.get(`${getGameLang()}_best_time`)) > parseInt(seconds)) {
            best_time = parseFloat(seconds).toFixed(1);
            api.set(`${getGameLang()}_best_time`, parseInt(seconds));
        }
    } else {
        best_time = parseFloat(seconds).toFixed(1);
        api.set(`${getGameLang()}_best_time`, parseFloat(seconds).toFixed(1));
    }

    api.set(`${getGameLang()}_finished`, true);
    api.set(`${getGameLang()}_last_played`, new Date());

    let percent_winning = parseFloat(parseFloat(wins)/parseFloat(played))*100;

    //finish screen
    $('.streak').html(win_streak);
    $('.best_streak').html(best_streak);
    $('.best_time').html(`${percent_winning.toFixed(1)}%`);
    $('.played').html(played);
    //$('.playing_time').html(`${time.toFixed(1)}s`);

    //showing statistics
    const statisticsModal = new bootstrap.Modal(document.getElementById('finish'))
    statisticsModal.show()

    //$('.twitter-share-link').attr('href', getTextForTwitter());
    const btn = document.querySelector('.stats_share');
    btn.addEventListener('click', async () => {
        await share()
    });
}

/*function getTextForTwitter() {
    var string;
    if (api.get('lang') == "en") {
        string = "I%20played%20Crosswords!"
    } else if (api.get('lang') == "pt") {
        string = "Eu%20joguei%20Crosswords!"
    } else if (api.get('lang') == "de") {
        string = "Ich%20habe%20Crosswords%20gespielt!"
    } else {
        string = "I%20played%20Crosswords!"
    }

    let time = parseFloat(api.get(`${getGameLang()}_time`));
    var gfg = document.URL;
    string = string + `%20${time.toFixed(1)}s%0A%0A`
    string = string + `%0A${gfg}`;

    api.set(`${getGameLang()}_share_link`, string)
    //console.log("Share link cookie now set")

    return "https://twitter.com/intent/tweet?text=" + string
}*/

async function share() {
    var string;
    if (api.get('lang') == "en") {
        string = "I played Crosswords! "
    } else if (api.get('lang') == "pt") {
        string = "Eu joguei Cruzadinha! "
    } else if (api.get('lang') == "de") {
        string = "Ich habe Crosswords gespielt! "
    } else {
        string = "I played Crosswords! "
    }

    let time = parseFloat(api.get(`${getGameLang()}_time`));
    string = string + `${time.toFixed(1)}s\n\n`

    var gfg = document.URL;

    const shareData = {
        text: string,
        url: gfg
    };

    try {
        await navigator.share(shareData)
    } catch (error) {
        navigator.clipboard.writeText(string + `${gfg}`);
        //alert("Copiado para a área de transferência!");
        const t = $('#copiado')
        const toast = new bootstrap.Toast(t);
        toast.show();
    }
}