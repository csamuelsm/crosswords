var grid;
var dica;

var curr_x = 0;
var curr_y = 0;

var dir = 0; // 0 - horizontal // 1 - vertical

var start_time;
var end_time;
var finished = false;

function clean_current_selection() {
    $('.start_line').removeClass('start_line');
    $('.start_tile').removeClass('start_tile');
}

function select_pos(curr_x, curr_y, dir) {
    clean_current_selection();
    if (dir == 0) {
        let curr_dica = grid[`${curr_x},${curr_y}`]['dica-horizontal'];
        $(`.tile[y=${curr_y}][value != "#"]`).each(function() {
            let tile_x = parseInt($(this).attr('x'));
            let tile_y = parseInt($(this).attr('y'));
            if (curr_dica == grid[`${tile_x},${tile_y}`]['dica-horizontal'])
                $(this).addClass('start_line');
        })
    } else {
        let curr_dica = grid[`${curr_x},${curr_y}`]['dica-vertical'];
        $(`.tile[x=${curr_x}][value != "#"]`).each(function() {
            let tile_x = parseInt($(this).attr('x'));
            let tile_y = parseInt($(this).attr('y'));
            if (curr_dica == grid[`${tile_x},${tile_y}`]['dica-vertical'])
                $(this).addClass('start_line');
        })
    }
    let start_tile = $(`.tile[y=${curr_y}][x=${curr_x}]`);
    start_tile.addClass('start_tile');
    if (dir == 0) start_tile.attr('visited_h', 1);
    else start_tile.attr('visited_v', 1);
}

function setup() {
    let start_tile = $('#line0 > .tile[value!="#"]:first');

    // setting up first clue
    curr_x = start_tile.attr("x");
    curr_y = start_tile.attr("y");

    select_pos(curr_x, curr_y, dir);

    if (dir == 0) dica = grid[`${curr_x},${curr_y}`]['dica-horizontal'];
    else dica = grid[`${curr_x},${curr_y}`]['dica-vertical'];

    $('.dica').html(dica);

}

$(document).ready(function() {
    start_time = new Date();

    //setuping os links
    $('.ep_banner_link').each((index, element) => {
        $(element).attr('href', getInstallUrl())
    })

    //crosswordmini
    //crosswordtradicional
    read_game(getGameLang(), 'crosswordmini')
        .then(data => generate_grid(data))
        .then(dict => {
            grid = dict;
            //console.log(grid);

            create_layout(grid);
            setup();

            // verificando se usuário já jogou
            let f = api.get(`${getGameLang()}_finished`);
            let last_played = new Date(api.get(`${getGameLang()}_last_played`))

            now = new Date()

            last_played.setHours(0, 0, 0, 0);
            now.setHours(0, 0, 0, 0);

            if (f && last_played.getTime() === now.getTime()) {
                finished = true;
                $('#quit_button').addClass("hide");
                $('.ep_banner_div').removeClass("hide");

                // removendo seleções
                $('.start_line').removeClass('start_line');
                $('.start_tile').removeClass('start_tile');

                // preenchendo tiles
                let items = $(`.tile[value != "#"]`);
                items.each(function(index, element) {
                    let object = $(this);
                    let answer = object.attr("value");
                    object.html(`<p>${answer.toUpperCase()}</p>`);
                    object.attr("answer", answer.toUpperCase());
                    object.attr("filled", 1);
                    object.attr("verified", 1);
                    object.addClass('correto');
                });

                //populando tela de estatísticas
                var win_streak = parseInt(api.get(`${getGameLang()}_win_streak`));
                var best_streak = parseInt(api.get(`${getGameLang()}_best_streak`));
                var played = parseInt(api.get(`${getGameLang()}_played`));
                var time =  parseFloat(api.get(`${getGameLang()}_time`));
                var best_time =  parseInt(api.get(`${getGameLang()}_best_time`));

                $('.streak').html(win_streak);
                $('.best_streak').html(best_streak);
                $('.best_time').html(`${best_time}s`);
                $('.played').html(played);
                $('.playing_time').html(`${time.toFixed(1)}s`);

                //abrindo tela de estatísticas
                const statisticsModal = new bootstrap.Modal(document.getElementById('finish'))
                statisticsModal.show()

                //$('.twitter-share-link').attr('href', getTextForTwitter());
                const btn = document.querySelector('.stats_share');
                btn.addEventListener('click', async () => {
                    await share()
                });
            }
        });
})