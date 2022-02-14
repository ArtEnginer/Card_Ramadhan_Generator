$(document).ready(function () {


    var url = 'https://raw.githubusercontent.com/iqbalsyamhad/Al-Quran-JSON-Indonesia-Kemenag/master/'
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
                element.style = "font-size:12px;font-weight:bold; margin-right:1rem; border-radius:30px;background-color:#f5f5f5;color:#000;padding:0.5rem;";
                element.innerHTML = '<a onclick="getSurat(\'' + json.data[i].id + '\', \'' + json.data[i].surat_name.replace(/[^\w\s]/gi, '') + '\')">' + json.data[i].id + '. Surat ' + json.data[i].surat_name + '</a>';
                daftarsurah.appendChild(element);
            }
        }).catch(function (error) {
            console.log(error);
        });

});

function getSurat(id, title) {
    var baseurl = 'https://raw.githubusercontent.com/iqbalsyamhad/Al-Quran-JSON-Indonesia-Kemenag/master/';
    var isLoading = document.getElementById("loadingview");
    isLoading.innerHTML = '<div class="spinner-border text-primary" role="status">'
    document.getElementById("surahtitle").innerHTML = title;
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
                div.innerHTML = '<p class="arabic pull-right"><span class="badge badge-primary">' + data.data[i].aya_number + '</span> ' + data.data[i].aya_text + '</p><div class="clearfix"></div><p class="terjemah">' + data.data[i].translation_aya_text + '</p>';
                mainContainer.appendChild(div);

            }
            isLoading.innerHTML = ''

            // // list group active
            // var list = document.getElementsByClassName('listsuraah')[0];
            // var items = list.getElementsByTagName('li');
            // for (var i = 0; i < items.length; i++) {
            //     items[i].classList.remove('active');
            // }
        })
        .catch(function (err) {
            alert('error: ' + err);
        });
}