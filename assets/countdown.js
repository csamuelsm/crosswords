var tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate()+1)
tomorrow.setHours(0,0,0,0)

$(document).ready(function() {
    setInterval(function() {
        var nowDate = new Date().getTime()

        var distance = tomorrow - nowDate;

        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            $('.countdown').html("Nova palavra já disponível!")
        } else {
            $('.countdown').html(hours + ":" + minutes + ":" + seconds)
        }
    }, 1000)
})