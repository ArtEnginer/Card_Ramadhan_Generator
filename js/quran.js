$(document).ready(function () {

    playAudio()


    var url = 'https://raw.githubusercontent.com/ArtEnginer/Card_Ramadhan_Generator/master/'
    fetch(url + "Daftar%20Surat.json")
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            var daftarsurah = document.getElementsByClassName('listsuraah')[0]
            for (var i = 0; i < json.data.length; i++) {
                //  crete element using class
                var element = document.createElement('li');
                element.className = 'surah list-group-item list-group-horizontal list-group-item-action list-group-item-dark text-center';
                element.style.fontSize = '12px';

                element.innerHTML = '<a onclick="getSurat(\'' + json.data[i].id + '\', \'' + json.data[i].surat_name.replace(/[^\w\s]/gi, '') + '\')">' + json.data[i].id + '. Surat ' + json.data[i].surat_name + '</a>';

                daftarsurah.appendChild(element);
            }
        }).catch(function (error) {
            console.log(error);
        });

});


function carisurah() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("listsuraah");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        // if value input same in listsuraah then show in list
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            // show in list
            li[i].style.display = "";
            li[i].className = 'surah list-group-item list-group-horizontal list-group-item-action list-group-item-dark text-center';
        } else {
            // hide in list
            li[i].style.display = "none";
        }

    }
}

function getSurat(id, title) {
    var baseurl = 'https://raw.githubusercontent.com/ArtEnginer/Card_Ramadhan_Generator/master/';
    var isLoading = document.getElementById("loadingview");
    isLoading.innerHTML = '<div class="spinner-border text-primary" role="status">'
    document.getElementById("surahtitle").innerHTML = title;
    var url = 'https://raw.githubusercontent.com/ArtEnginer/Audio/master/'
    document.getElementById("audio").src = url + id + '.mp3';

    var mainContainer = document.getElementById("surah");
    mainContainer.innerHTML = '';

    fetch(baseurl + 'Surat/' + id + '.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.data.length; i++) {


                var div = document.createElement("div");
                div.className = "card text-center cardsurah";
                div.innerHTML = '<p class="arabic pull-right"><span class="badge badge-primary aya_number">' + data.data[i].aya_number + '</span> ' + data.data[i].aya_text + '</p><div class="clearfix"></div><p class="terjemah">' + data.data[i].translation_aya_text + '</p>';
                mainContainer.appendChild(div);
            }
            isLoading.innerHTML = ''
        })
        .catch(function (err) {
            alert('error: ' + err);
        });
}

function playAudio() {
    // get audio in github using api   

    var url = 'https://raw.githubusercontent.com/ArtEnginer/Audio/master/'

    // auto play music
    var audio = document.getElementById("audio");
    audio.src = url + 'audio1.mpeg';
    // atribbute auto play
    audio.autoplay = true;
}