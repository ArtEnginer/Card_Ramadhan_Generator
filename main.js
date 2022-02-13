$(document).ready(function () {
    let url = "file:///C:/Users/Angga/Desktop/CARD-RAMDHAN-GENERATOR/index.html";

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };
    var getnama = getUrlParameter("nama");
    var getharapan = getUrlParameter("harapan");

    var text = function (text) {
        //   replace symbol with space
        text = text.replace(/\+/g, ' ');
        return text;
    };

    if (getnama == null || getharapan == null) {
        $("#getnama").text("Nama");
        $("#getharapan").text("Harapan");

    } else if (getnama == false || getharapan == false) {
        $("#getnama").text("Nama");
        $("#getharapan").text("Harapan");

    } else {
        $("#getnama").text(text(getnama));
        $("#getharapan").text(text(getharapan));
        $('.ramadhancard').removeClass('fade').show();
        $('.form').hide();

    }

    $('.btn_buat').click(function () {
        location.href = url;
    });

    $(".btn_share").click(function () {
        var nama = $("#getnama").text();
        var harapan = $("#getharapan").text();
        var text = "Ramadhan Card Generator\n" + " Nama : " + nama + "\n" + " Harapan : " + harapan;
        var url_share = url + "?nama=" + nama.replace(/\s/g, '+') +
            "&harapan=" + harapan.replace(/\s/g, '+');

        var hashtags = "\nBuat kartu ucapan selamat ramadhan sekarang juga dan tulis harapanmu di sini ";
        var wa_url_share = "https://wa.me/?text=" + encodeURIComponent(text + "\n" + hashtags + url_share);
        window.open(wa_url_share, '_blank');
    });

    function countdown_date() {
        // Set the date we're counting down to
        var countDownDate = new Date("April 3, 2022 00:00:00").getTime();

        // Update the count down every 1 second
        var x = setInterval(function () {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var weeks = Math.floor((distance / (1000 * 60 * 60 * 24 * 7)));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);


            // $("#coutdown").text(weeks + " Weeks " + days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds");
            $(".weeks").text(weeks);
            $(".days").text(days);
            $(".hours").text(hours);
            $(".minutes").text(minutes);
            $(".seconds").text(seconds);

            // If the count down is finished, write some text 
            if (distance < 0) {
                clearInterval(x);
                $("#coutdown").text("SELAMAT MENUNAIKAN IBADAH PUASA RAMADHAN 1443H");
            }
        }, 1000);
    }

    countdown_date();



});