var grid;
var dica;

var curr_x = 0;
var curr_y = 0;

var dir = 0; // 0 - horizontal // 1 - vertical

function clean_current_selection() {
    $('.start_line').removeClass('start_line');
    $('.start_tile').removeClass('start_tile');
}

function select_pos(curr_x, curr_y, dir) {
    clean_current_selection();
    if (dir == 0) {
        $(`.tile[y=${curr_y}][value != "#"]`).each(function() {
            $(this).addClass('start_line');
        })
    } else {
        $(`.tile[x=${curr_x}][value != "#"]`).each(function() {
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
    //crosswordmini
    //crosswordtradicional
    read_game('pt', 'crosswordmini')
        .then(data => generate_grid(data))
        .then(dict => {
            grid = dict;
            //console.log(grid);

            create_layout(grid);
            setup();
        });
})