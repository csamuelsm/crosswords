function next_empty_tile() {
    let next_tile = $(`.tile[value != "#"][fill != 1]:first`);
    if (next_tile.length > 0) {
        let x = next_tile.attr("x");
        let y = next_tile.attr("y");
        curr_x = x;
        curr_y = y;
        update(parseInt(x), parseInt(y), dir);
    }
}

function verify_word(tiles) {

    let valid = true;
    tiles.each(function(index, tile) {
        if ($(this).attr("value") != $(this).attr("answer").normalize('NFC').toLowerCase())
            valid = false;
    })
    if (valid) {
        tiles.each(function(index, tile) {
            $(this).addClass('correto');
        })
    } else {
        console.log('resposta errada');
    }

}

function next_tile() {
    if (dir == 0) {
        if($(`.tile[x=${parseInt(curr_x) + 1}][y=${parseInt(curr_y)}][value!="#"]`).length > 0) {
            update(parseInt(curr_x)+1, curr_y, dir);
            //curr_x = parseInt(curr_x)+1;
        } else {
            // TODO: VERIFICAR AQUI SE A PALAVRA DA LINHA ATUAL ESTÁ CORRETA
            let tiles = $(`.tile[y = ${curr_y}][value != "#"]`);
            verify_word(tiles);
            next_empty_tile();
        }
    } else {
        if($(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y) + 1}][value!="#"]`).length > 0) {
            update(parseInt(curr_x), parseInt(curr_y)+1, dir);
            //curr_y = parseInt(curr_y)+1;
        } else {
            // TODO: VERIFICAR AQUI SE A PALAVRA DA COLUNA ATUAL ESTÁ CORRETA
            let tiles = $(`.tile[x = ${curr_x}][value != "#"]`);
            verify_word(tiles);
            next_empty_tile();
        }
    }
}

function up_tile() {

    if($(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)-1}][value!="#"]`).length > 0) {
        update(parseInt(curr_x), parseInt(curr_y)-1, dir);
        //curr_x = parseInt(curr_x)+1;
    } else {
        next_empty_tile();
    }

}

function down_tile() {

    if($(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)+1}][value!="#"]`).length > 0) {
        update(parseInt(curr_x), parseInt(curr_y)+1, dir);
        //curr_x = parseInt(curr_x)+1;
    } else {
        next_empty_tile();
    }

}

function previous_tile() {
    if (dir == 0) {
        if($(`.tile[x=${parseInt(curr_x) - 1}][y=${parseInt(curr_y)}][value!="#"]`).length > 0) {
            update(parseInt(curr_x)-1, curr_y, dir);
            //curr_x = parseInt(curr_x)-1;
        }
    } else {
        if($(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y) - 1}][value!="#"]`).length > 0) {
            update(parseInt(curr_x), parseInt(curr_y)-1, dir);
            //curr_y = parseInt(curr_y)-1;
        }
    }
}

function backspace() {
    if (dir == 0) {
        let target = $(`.tile[x=${parseInt(curr_x) - 1}][y=${parseInt(curr_y)}][value!="#"]`);
        if(target.length > 0) {
            if ($(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)}]`).html() == "") {
                update(parseInt(curr_x)-1, curr_y, dir);
                target.html("");
            } else {
                $(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)}]`).html("");
            }
            //curr_x = parseInt(curr_x)-1;
        }
    } else {
        let target = $(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)-1}][value!="#"]`);
        if(target.length > 0) {
            if ($(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)}]`).html() == "") {
                update(parseInt(curr_x)-1, parseInt(curr_y)-1, dir);
                target.html("");
            } else {
                $(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)}]`).html("");
            }
            //curr_x = parseInt(curr_x)-1;
        }
    }
}

function change_direction() {
    if (dir == 0) {
        dir = 1;
        update(parseInt(curr_x), curr_y, dir);
    } else {
        dir = 0;
        update(parseInt(curr_x), curr_y, dir);
    }
}