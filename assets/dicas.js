/*
    script para pegar as dicas
*/

function update(x, y, dir) {
    select_pos(x, y, dir);

    curr_x = x;
    curr_y = y;
    //console.log(x, y);
    if (dir == 0) dica = grid[`${x},${y}`]['dica-horizontal'];
    else dica = grid[`${x},${y}`]['dica-vertical'];

    $('.dica').html(dica);
}

$(document).ready(function(){
    $('.board').on('click', '.tile', function(){
        //console.log('tile click');
        if (!finished) {
            let x = $(this).attr('x');
            let y = $(this).attr('y');

            if (x == curr_x && y == curr_y) {
                if (dir == 0) dir = 1;
                else dir = 0;
            }

            update(x, y, dir);
        }

    })
})