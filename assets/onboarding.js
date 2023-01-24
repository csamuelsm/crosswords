$(document).ready(function(){
    if (!api.get(`${getGameLang()}_onboarding`)) {
        const onboardingModal = new bootstrap.Modal(document.getElementById('onboarding-1'))
        onboardingModal.show()
        api.set(`${getGameLang()}_onboarding`, true);
        //api.set(`${getGameLang()}_onboarding`, true)
    }

    $('.onboarding-show').on('click', function(){
        const onboardingModal = new bootstrap.Modal(document.getElementById('onboarding-1'))
        onboardingModal.show()
    })

    $('.configuracoes-show').on('click', function(){
        const configuracoesModal = new bootstrap.Modal(document.getElementById('configuracoes'))
        configuracoesModal.show()
    })

    $('.estatisticas-show').on('click', function(){
        let f = api.get(`${getGameLang()}_finished`);
        let last_played = new Date(api.get(`${getGameLang()}_last_played`))

        now = new Date()

        last_played.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);

        if (!(f && last_played.getTime() === now.getTime())) {
            // remove o 'Jogo FInalizado'
            $('.finished_title').addClass('hide')
            $('.finished_text').addClass('hide')
        } else {
            $('.finished_title').removeClass('hide')
            $('.finished_text').removeClass('hide')
        }

        const estatisticasModal = new bootstrap.Modal(document.getElementById('finish'))
        estatisticasModal.show()
    })

    $('.desistir-button').on('click', function(){
        //desistir
        finished = true;
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

        if (api.get(`${getGameLang()}_wins`)) {
            wins = parseInt(api.get(`${getGameLang()}_wins`));
        }
        else {
            wins = 0;
            api.set(`${getGameLang()}_wins`, 0);
        }

        if (api.get(`${getGameLang()}_win_streak`)) {
            win_streak = api.get(`${getGameLang()}_win_streak`);
        }
        else {
            win_streak = 0;
            api.set(`${getGameLang()}_win_streak`, 0);
        }

        if(api.get(`${getGameLang()}_best_streak`)) {
            best_streak = api.get(`${getGameLang()}_best_streak`);
        } else {
            best_streak = 0;
            api.set(`${getGameLang()}_best_streak`, 0);
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
        } else {
            best_time = 9999999;
            api.set(`${getGameLang()}_best_time`, 9999999);
        }

        api.set(`${getGameLang()}_finished`, true);
        api.set(`${getGameLang()}_last_played`, new Date());

        //$('.finished_title').addClass('hide')
        //$('.finished_text').addClass('hide')

        let percent_winning = parseFloat(parseFloat(wins)/parseFloat(played))*100;

        //finish screen
        $('.streak').html(win_streak);
        $('.best_streak').html(best_streak);
        $('.best_time').html(`${percent_winning.toFixed(1)}%`);
        $('.played').html(played);
        //$('.playing_time').html(`${time.toFixed(1)}s`);

        //$('.twitter-share-link').attr('href', getTextForTwitter());
        const btn = document.querySelector('.stats_share');
        btn.addEventListener('click', async () => {
            await share()
        });
    })
})