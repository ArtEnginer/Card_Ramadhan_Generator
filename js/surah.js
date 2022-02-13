 $(document).ready(function () {

     $('.btn-quran').click(function () {
         var url = 'https://raw.githubusercontent.com/iqbalsyamhad/Al-Quran-JSON-Indonesia-Kemenag/master/'
         fetch(url + "Daftar%20Surat.json")
             .then(function (response) {
                 return response.json()
             })
             .then(function (json) {
                 var daftarsurah = document.getElementsByClassName('daftarsurah')[0]
                 for (var i = 0; i < json.data.length; i++) {
                     var div = document.createElement("div");
                     div.innerHTML = '<a class="list-group-item list-group-item-action bg-light" style="cursor: pointer;" onclick="getSurat(\'' + json.data[i].id + '\', \'' + json.data[i].surat_name.replace(/[^\w\s]/gi, '') + '\')">' + json.data[i].id + '. Surat ' + json.data[i].surat_name + '</a>';
                     daftarsurah.appendChild(div);
                 }
             }).catch(function (error) {
                 console.log(error);
             });

     });


     function getSurat(id, title) {
         var url = 'https://raw.githubusercontent.com/iqbalsyamhad/Al-Quran-JSON-Indonesia-Kemenag/master/'
         fetch(url + id + ".json")
             .then(function (response) {
                 return response.json()
             })
             .then(function (json) {
                 var daftarayat = document.getElementsByClassName('daftarayat')[0]
                 daftarayat.innerHTML = ''
                 for (var i = 0; i < json.data.length; i++) {
                     var div = document.createElement("div");
                     div.innerHTML = '<a class="list-group-item list-group-item-action bg-light" style="cursor: pointer;" onclick="getAyat(\'' + json.data[i].id + '\', \'' + json.data[i].ayat_name + '\')">' + json.data[i].id + '. ' + json.data[i].ayat_name + '</a>';
                     daftarayat.appendChild(div);
                 }
                 $('#modal-title').text(title);
                 $('#modal-surat').modal('show');
             }).catch(function (error) {
                 console.log(error);
             });
     }


 });