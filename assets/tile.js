function next_empty_tile() {
    var next_tile;
    if (dir == 0) {
        next_tile = $(`.tile[value != "#"][answer = "none"][visited_h != 1]`).filter(function(){
            return parseInt($(this).attr("y")) > parseInt(curr_y) || parseInt($(this).attr("x")) > parseInt(curr_x);
        });
        next_tile = next_tile.first();
    } else {
        next_tile = $(`.tile[value != "#"][answer = "none"][visited_v != 1]`).filter(function(){
            return parseInt($(this).attr("x")) == parseInt(curr_x) || parseInt($(this).attr("y")) > parseInt(curr_y);
        })
        next_tile = next_tile.first();
    }
    if (next_tile.length > 0) {
        let x = next_tile.attr("x");
        let y = next_tile.attr("y");
        curr_x = x;
        curr_y = y;
        update(parseInt(x), parseInt(y), dir);
    } else {
        next_tile = $(`.tile[value != "#"][filled != 1][verified != 1]:first`);
        if (next_tile.length > 0) {
            let x = next_tile.attr("x");
            let y = next_tile.attr("y");
            curr_x = x;
            curr_y = y;
            update(parseInt(x), parseInt(y), dir);
        }
    }
}

function verify_grid() {
    for (let i = 0; i < biggest_x; i++) {
        let tiles = $(`.tile[x = ${i}][value != "#"]`);
        verify_word(tiles);
    }

    for (let i = 0; i < biggest_y; i++) {
        let tiles = $(`.tile[y = ${i}][value != "#"]`);
        verify_word(tiles);
    }

    let all_tiles = $('.tile[value != "#"]');
    let win = true;
    all_tiles.each(function(index, element) {
        verified = $(this).attr('verified')
        if (verified != 1) {
            win = false
        }
    })
    if (win) {
        $('.start_line').removeClass('start_line');
        $('.start_tile').removeClass('start_tile');
        win_routine();
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
            $(this).attr('verified', 1);
        })
    } else {
        console.log('resposta errada');
    }

}

function next_tile() {
    verify_grid();
    if (dir == 0) {
        if($(`.tile[x=${parseInt(curr_x) + 1}][y=${parseInt(curr_y)}][value!="#"][verified != 1]`).length > 0) {
            update(parseInt(curr_x)+1, curr_y, dir);
            //curr_x = parseInt(curr_x)+1;
        } else {
            // TODO: VERIFICAR AQUI SE A PALAVRA DA LINHA ATUAL ESTÁ CORRETA
            //let tiles = $(`.tile[y = ${curr_y}][value != "#"]`);
            //verify_word(tiles);
            next_empty_tile();
        }
    } else {
        if($(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y) + 1}][value!="#"][verified != 1]`).length > 0) {
            update(parseInt(curr_x), parseInt(curr_y)+1, dir);
            //curr_y = parseInt(curr_y)+1;
        } else {
            // TODO: VERIFICAR AQUI SE A PALAVRA DA COLUNA ATUAL ESTÁ CORRETA
            //let tiles = $(`.tile[x = ${curr_x}][value != "#"]`);
            //verify_word(tiles);
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

function right_tile() {

    if($(`.tile[x=${parseInt(curr_x)+1}][y=${parseInt(curr_y)}][value!="#"]`).length > 0) {
        update(parseInt(curr_x)+1, parseInt(curr_y), dir);
        //curr_x = parseInt(curr_x)+1;
    } else {
        if (curr_x = biggest_x - 1 && curr_y == biggest_y - 1) {
            console.log('dir = 1, next empty tile')
            dir = 1;
            next_empty_tile();
        } else {
            next_empty_tile();
        }
    }

}

function left_tile() {

    if($(`.tile[x=${parseInt(curr_x)-1}][y=${parseInt(curr_y)}][value!="#"]`).length > 0) {
        update(parseInt(curr_x)-1, parseInt(curr_y), dir);
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
                if (target.attr('verified') != 1) {
                    update(parseInt(curr_x)-1, curr_y, dir);
                    target.html("");
                    target.attr("filled", "0");
                    target.attr("answer", "none");
                }
            } else {
                let curr = $(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)}]`);
                if (curr.attr('verified') != 1) {
                    curr.html("");
                    curr.attr("filled", "0");
                    curr.attr("answer", "none");
                }
            }
            //curr_x = parseInt(curr_x)-1;
        }
    } else {
        let target = $(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)-1}][value!="#"]`);
        if(target.length > 0) {
            if ($(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)}]`).html() == "") {
                if (target.attr('verified') != 1) {
                    update(parseInt(curr_x), parseInt(curr_y)-1, dir);
                    target.html("");
                    target.attr("filled", "0");
                    target.attr("answer", "none");
                }
            } else {
                let curr = $(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)}]`);
                if (curr.attr('verified') != 1) {
                    curr.html("");
                    curr.attr("filled", "0");
                    curr.attr("answer", "none");
                }
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