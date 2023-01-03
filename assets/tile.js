/*function next_empty_tile() {
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
}*/

function next_empty_tile() {
    var next_tile;
    // próximo no mesmo eixo
    if (dir == 0) {
        next_tile = $(`.tile[value != "#"][answer = "none"][y = ${curr_y}]`).filter(function(){
            return parseInt($(this).attr("x")) > curr_x;
        })
    } else {
        next_tile = $(`.tile[value != "#"][answer = "none"][x = ${curr_x}]`).filter(function(){
            return parseInt($(this).attr("y")) > curr_y;
        })
    }
    if (next_tile.length > 0) {
        next_tile = next_tile.first();
        let x = next_tile.attr("x");
        let y = next_tile.attr("y");
        curr_x = x;
        curr_y = y;
        update(parseInt(x), parseInt(y), dir);
    } else {
        // próximo na mesma direção
        if (dir == 0) {
            next_tile = $(`.tile[value != "#"][answer = "none"]`).filter(function(){
                return parseInt($(this).attr("y")) > curr_y;
            })
        } else {
            next_tile = $(`.tile[value != "#"][answer = "none"]`).filter(function(){
                return parseInt($(this).attr("x")) > curr_x;
            })
        }
        if (next_tile.length > 0) {
            next_tile = next_tile.first();
            let x = next_tile.attr("x");
            let y = next_tile.attr("y");
            curr_x = x;
            curr_y = y;
            update(parseInt(x), parseInt(y), dir);
        } else {
            // próximo que ainda não foi visitado
            if (dir == 0) {
                next_tile = $(`.tile[value != "#"][answer = "none"][visited_h != 1]`)
            } else {
                next_tile = $(`.tile[value != "#"][answer = "none"][visited_v != 1]`)
            }
            if (next_tile.length > 0) {
                next_tile = next_tile.first();
                let x = next_tile.attr("x");
                let y = next_tile.attr("y");
                curr_x = x;
                curr_y = y;
                update(parseInt(x), parseInt(y), dir);
            } else {
                next_tile = $(`.tile[value != "#"][answer = "none"]`)
                next_tile = next_tile.first();
                let x = next_tile.attr("x");
                let y = next_tile.attr("y");
                curr_x = x;
                curr_y = y;
                update(parseInt(x), parseInt(y), dir);
            }
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

    for (let i = 0; i < biggest_x; i++) {
        for (let j = 0; j < biggest_y; j++) {
            if ($(`.tile[x=${i}][y=${j}]`).attr('value') != "#") {
                let curr_dica_h = grid[`${i},${j}`]['dica-horizontal'];
                let curr_dica_v = grid[`${i},${j}`]['dica-vertical'];

                let tiles_v = $(`.tile[x = ${i}][value != "#"]`).filter(function(){
                    let tile_dica_v = grid[`${parseInt($(this).attr("x"))},${parseInt($(this).attr("y"))}`]['dica-vertical'];
                    return tile_dica_v == curr_dica_v;
                });
                //console.log('tiles_v', tiles_v);
                verify_word(tiles_v);

                let tiles_h = $(`.tile[y = ${j}][value != "#"]`).filter(function(){
                    let tile_dica_h = grid[`${parseInt($(this).attr("x"))},${parseInt($(this).attr("y"))}`]['dica-horizontal'];
                    return tile_dica_h == curr_dica_h;
                });
                //console.log('tiles_h', tiles_h);
                verify_word(tiles_h);
            }
        }
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

        setTimeout(win_routine, 1000);
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
    let next = $(`.tile[x=${parseInt(curr_x)}][value!="#"]`).filter(function(){
        return parseInt($(this).attr("y")) < curr_y;
    }).last();
    if(next.length > 0) {
        update(parseInt(next.attr("x")), parseInt(next.attr("y")), dir);
        //curr_x = parseInt(curr_x)+1;
    } else {
        if (curr_x == 0 && curr_y == 0) {
            //console.log('dir = 1, next empty tile')
            dir = 0;
            let next_tile = $(`.tile[y = ${biggest_y-1}][value != "#"]`).first();
            update(parseInt(next_tile.attr("x")), parseInt(next_tile.attr("y")), dir)
        } else {
            let next_column = $(`.tile[value != "#"][answer = none]`).filter(function(){
                return parseInt($(this).attr("x")) == curr_x - 1;
            })
            if (next_column.length > 0) {
                first_next = next_column.last();
                update(parseInt(first_next.attr("x")), parseInt(first_next.attr("y")), dir);
            } else {
                next_column = $(`.tile[value != "#"][answer = none]`).filter(function(){
                    return parseInt($(this).attr("x")) < curr_x;
                })
                if (next_column.length > 0) {
                    first_next = next_column.last();
                    update(parseInt(first_next.attr("x")), parseInt(first_next.attr("y")), dir);
                } else {
                    dir = 0;
                    let next_tile = $(`.tile[y = ${biggest_y-1}][x = ${curr_x}][value != "#"]`);
                    if (next_tile.length > 0) {
                        next_tile = next_tile.first();
                        update(parseInt(next_tile.attr("x")), parseInt(next_tile.attr("y")), dir)
                    } else {
                        next_tile = $(`.tile[y = ${biggest_y-1}][value != "#"]`).first();
                        update(parseInt(next_tile.attr("x")), parseInt(next_tile.attr("y")), dir)
                    }
                }

            }

        }
    }

}

function down_tile() {
    let next = $(`.tile[x=${parseInt(curr_x)}][value!="#"]`).filter(function(){
        return parseInt($(this).attr("y")) > curr_y;
    }).first();
    if(next.length > 0) {
        update(parseInt(next.attr("x")), parseInt(next.attr("y")), dir);
        //curr_x = parseInt(curr_x)+1;
    } else {
        if (curr_x == biggest_x - 1 && curr_y == biggest_y - 1) {
            //console.log('dir = 1, next empty tile')
            dir = 0;
            let next_tile = $(`.tile[y = 0][value != "#"]`).first();
            update(parseInt(next_tile.attr("x")), parseInt(next_tile.attr("y")), dir)
        } else {
            let next_column = $(`.tile[value != "#"][answer = none]`).filter(function(){
                return parseInt($(this).attr("x")) == curr_x + 1;
            })
            if (next_column.length > 0) {
                first_next = next_column.first();
                update(parseInt(first_next.attr("x")), parseInt(first_next.attr("y")), dir);
            } else {
                next_column = $(`.tile[value != "#"][answer = none]`).filter(function(){
                    return parseInt($(this).attr("x")) > curr_x;
                })
                if (next_column.length > 0) {
                    first_next = next_column.first();
                    update(parseInt(first_next.attr("x")), parseInt(first_next.attr("y")), dir);
                } else {
                    dir = 0;
                    let next_tile = $(`.tile[y = 0][x = ${curr_x}][value != "#"]`);
                    if (next_tile.length > 0) {
                        next_tile = next_tile.first();
                        update(parseInt(next_tile.attr("x")), parseInt(next_tile.attr("y")), dir)
                    } else {
                        next_tile = $(`.tile[y = 0][value != "#"]`).first();
                        update(parseInt(next_tile.attr("x")), parseInt(next_tile.attr("y")), dir)
                    }
                }
            }


        }
    }

}

function right_tile() {
    let next = $(`.tile[y=${parseInt(curr_y)}][value!="#"]`).filter(function(){
        return parseInt($(this).attr("x")) > curr_x;
    }).first();
    if(next.length > 0) {
        update(parseInt(next.attr("x")), parseInt(next.attr("y")), dir);
        //curr_x = parseInt(curr_x)+1;
    } else {
        if (curr_x == biggest_x - 1 && curr_y == biggest_y - 1) {
            //console.log('dir = 1, next empty tile')
            dir = 1;
            let next_tile = $(`.tile[y = 0][value != "#"]`).first();
            update(parseInt(next_tile.attr("x")), parseInt(next_tile.attr("y")), dir)
        } else if (curr_x == biggest_x - 1) {
            //console.log("curr_x == biggest_X - 1")
            let next_line = $(`.tile[value != "#"][answer = none]`).filter(function(){
                return parseInt($(this).attr("y")) > curr_y;
            })
            //console.log(next_line);
            if (next_line.length > 0) {
                first_next = next_line.first();
                update(parseInt(first_next.attr("x")), parseInt(first_next.attr("y")), dir);
            } else {
                next_empty_tile();
            }
        } else {
            let next_in_row = $(`.tile[value != "#"][y = ${parseInt(curr_y)}]`).filter(function(){
                return parseInt($(this).attr("x")) > curr_x;
            })
            if (next_in_row.length > 0) {
                let first_next = next_in_row.first();
                update(parseInt(first_next.attr("x")), parseInt(first_next.attr("y")), dir);
            } else {
                let next_line = $(`.tile[value != "#"][answer = none]`).filter(function(){
                    return parseInt($(this).attr("y")) > curr_y;
                })
                //console.log(next_line);
                if (next_line.length > 0) {
                    first_next = next_line.first();
                    update(parseInt(first_next.attr("x")), parseInt(first_next.attr("y")), dir);
                } else {
                    next_empty_tile();
                }
            }
        }

    }

}

function left_tile() {

    let next = $(`.tile[y=${parseInt(curr_y)}][value!="#"]`).filter(function(){
        return parseInt($(this).attr("x")) < curr_x;
    }).last();
    if(next.length > 0) {
        update(parseInt(next.attr("x")), parseInt(next.attr("y")), dir);
        //curr_x = parseInt(curr_x)+1;
    } else {
        if (curr_x == 0 && curr_y == 0) {
            //console.log('dir = 1, next empty tile')
            dir = 1;
            let next_tile = $(`.tile[y = ${biggest_y-1}][value != "#"]`).last();
            update(parseInt(next_tile.attr("x")), parseInt(next_tile.attr("y")), dir)
        } else if (curr_x == 0) {
            //console.log("curr_x == biggest_X - 1")
            let next_line = $(`.tile[value != "#"][answer = none]`).filter(function(){
                return parseInt($(this).attr("y")) < curr_y;
            })
            //console.log(next_line);
            if (next_line.length > 0) {
                first_next = next_line.last();
                update(parseInt(first_next.attr("x")), parseInt(first_next.attr("y")), dir);
            } else {
                next_empty_tile();
            }
        } else {
            let next_in_row = $(`.tile[value != "#"][y = ${parseInt(curr_y)}]`).filter(function(){
                return parseInt($(this).attr("x")) < curr_x;
            })
            if (next_in_row.length > 0) {
                let first_next = next_in_row.first();
                update(parseInt(first_next.attr("x")), parseInt(first_next.attr("y")), dir);
            } else {
                let next_line = $(`.tile[value != "#"][answer = none]`).filter(function(){
                    return parseInt($(this).attr("y")) < curr_y;
                })
                //console.log(next_line);
                if (next_line.length > 0) {
                    first_next = next_line.last();
                    update(parseInt(first_next.attr("x")), parseInt(first_next.attr("y")), dir);
                } else {
                    next_empty_tile();
                }
            }
        }

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
        } else {
            let curr = $(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)}]`);
            if (curr.html() != "") {
                curr.html("");
                curr.attr("filled", "0");
                curr.attr("answer", "none");
            }
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
        } else {
            let curr = $(`.tile[x=${parseInt(curr_x)}][y=${parseInt(curr_y)}]`);
            if (curr.html() != "") {
                curr.html("");
                curr.attr("filled", "0");
                curr.attr("answer", "none");
            }
        }
    }
}

function change_direction() {
    if (!finished) {
        if (dir == 0) {
            dir = 1;
            update(parseInt(curr_x), curr_y, dir);
        } else {
            dir = 0;
            update(parseInt(curr_x), curr_y, dir);
        }
    }
}

function proxima_dica() {
    if (dir == 0) {
        let curr_dica = grid[`${curr_x},${curr_y}`]['dica-horizontal'];
        let proxima = $(`.tile[y = ${curr_y}][value != "#"][verified != 1]`).filter(function(){
            let tile_dica_h = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-horizontal'];
            return curr_dica != tile_dica_h && parseInt($(this).attr("x")) > curr_x;
        });
        if (proxima.length > 0) {
            proxima = proxima.first();
            update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
        } else {
            proxima = $(`.tile[value != "#"][verified != 1]`).filter(function(){
                let tile_dica_h = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-horizontal'];
                return curr_dica != tile_dica_h && parseInt($(this).attr("y")) == curr_y +1;
            });
            if (proxima.length > 0) {
                proxima = proxima.first();
                update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
            } else {
                proxima = $(`.tile[value != "#"][verified != 1]`).filter(function(){
                    let tile_dica_h = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-horizontal'];
                    return curr_dica != tile_dica_h && parseInt($(this).attr("y")) > curr_y;
                });
                if (proxima.length > 0) {
                    proxima = proxima.first();
                    update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
                } else {
                    if (curr_y == biggest_y-1) {
                        proxima = $(`.tile[value != "#"][verified != 1]`).first();
                        update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
                    } else {
                        down_tile();
                    }
                }
            }

        }
    } else {
        let curr_dica = grid[`${curr_x},${curr_y}`]['dica-vertical'];
        let proxima = $(`.tile[x = ${curr_x}][value != "#"][verified != 1]`).filter(function(){
            let tile_dica_v = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-vertical'];
            return curr_dica != tile_dica_v && parseInt($(this).attr("y")) > curr_y;
        });
        if (proxima.length > 0) {
            proxima = proxima.first();
            update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
        } else {
            proxima = $(`.tile[value != "#"][verified != 1]`).filter(function(){
                let tile_dica_h = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-horizontal'];
                return curr_dica != tile_dica_h && parseInt($(this).attr("x")) == curr_x + 1;
            });
            if (proxima.length > 0) {
                proxima = proxima.first();
                update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
            } else {
                proxima = $(`.tile[value != "#"][verified != 1]`).filter(function(){
                    let tile_dica_h = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-horizontal'];
                    return curr_dica != tile_dica_h && parseInt($(this).attr("x")) > curr_x;
                });
                if (proxima.length > 0) {
                    proxima = proxima.first();
                    update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
                } else {
                    if (curr_x == biggest_x - 1) {
                        proxima = $(`.tile[value != "#"][verified != 1]`).first();
                        update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
                    } else {
                        right_tile();
                    }
                }
            }

        }
    }
}

function anterior_dica() {
    if (dir == 0) {
        let curr_dica = grid[`${curr_x},${curr_y}`]['dica-horizontal'];
        let proxima = $(`.tile[y = ${curr_y}][value != "#"][verified != 1]`).filter(function(){
            let tile_dica_h = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-horizontal'];
            return curr_dica != tile_dica_h && parseInt($(this).attr("x")) < curr_x;
        });
        if (proxima.length > 0) {
            proxima = proxima.first();
            update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
        } else {
            proxima = $(`.tile[value != "#"][verified != 1]`).filter(function(){
                let tile_dica_h = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-horizontal'];
                return curr_dica != tile_dica_h && parseInt($(this).attr("y")) == curr_y - 1;
            });
            if (proxima.length > 0) {
                proxima = proxima.first();
                update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
            } else {
                proxima = $(`.tile[value != "#"][verified != 1]`).filter(function(){
                    let tile_dica_h = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-horizontal'];
                    return curr_dica != tile_dica_h && parseInt($(this).attr("y")) < curr_y;
                });
                if (proxima.length > 0) {
                    proxima = proxima.first();
                    update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
                } else {
                    if (curr_y == 0) {
                        proxima = $(`.tile[x=${biggest_x-1}][value != "#"][verified != 1]`).last();
                        update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
                    } else {
                        up_tile();
                    }
                }
            }
        }
    } else {
        let curr_dica = grid[`${curr_x},${curr_y}`]['dica-vertical'];
        let proxima = $(`.tile[x = ${curr_x}][value != "#"][verified != 1]`).filter(function(){
            let tile_dica_v = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-vertical'];
            return curr_dica != tile_dica_v && parseInt($(this).attr("y")) < curr_y;
        });
        if (proxima.length > 0) {
            proxima = proxima.first();
            update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
        } else {
            proxima = $(`.tile[value != "#"][verified != 1]`).filter(function(){
                let tile_dica_v = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-vertical'];
                return curr_dica != tile_dica_v && parseInt($(this).attr("x")) == curr_x - 1;
            });
            if (proxima.length > 0) {
                proxima = proxima.first();
                update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
            } else {
                proxima = $(`.tile[value != "#"][verified != 1]`).filter(function(){
                    let tile_dica_h = grid[`${$(this).attr("x")},${$(this).attr("y")}`]['dica-horizontal'];
                    return curr_dica != tile_dica_h && parseInt($(this).attr("x")) < curr_x;
                });
                if (proxima.length > 0) {
                    proxima = proxima.first();
                    update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
                } else {
                    if (curr_x == 0) {
                        proxima = $(`.tile[y=${biggest_y-1}][value != "#"][verified != 1]`).last();
                        update(parseInt(proxima.attr("x")), parseInt(proxima.attr("y")), dir);
                    } else {
                        left_tile();
                    }
                }
            }
        }
    }
}

$(document).ready(function(){
    $('.right-dica').on('click', function(){
        if (!finished) proxima_dica();
    })
    $('.left-dica').on('click', function(){
        if (!finished) anterior_dica();
    })
})