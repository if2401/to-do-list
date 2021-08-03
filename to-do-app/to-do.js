// ! DOM ELEMENT SELECT
const textInput = document.querySelector('#task')
const addBtn = document.querySelector('#addBtn')
const ulDOM = document.querySelector('#list')
const allDeleteBtn = document.querySelector('#allDeleteBtn')

// ! EVENT LİSTENERS
addBtn.addEventListener('click', addNewItem);
allDeleteBtn.addEventListener('click', deleteAll);

// ! Yeni Görev Ekleme
function addNewItem() {

    // input value query
    if (textInput.value[0] == " " || textInput.value == "") {
        return alert('Listeye boş ekleme yapılamaz...')
    }


    // create li element
    let liTag = document.createElement('li')
    liTag.innerText = textInput.value;
    ulDOM.appendChild(liTag);

    // create span tag (delete item btn)
    let deleteItemBtn = document.createElement('span')
    deleteItemBtn.innerHTML = '<i class="fas fa-times noclick"></i>'
    deleteItemBtn.className = 'close'
    liTag.appendChild(deleteItemBtn)


    // Add Checked Class li
    liTag.addEventListener('click', addCheckedClass)

    // Remove Li Tag onclick X
    deleteItemBtn.addEventListener('click', deleteItem)


    localStorageEkle(textInput.value)
    // İnput Value Reset
    textInput.value = ''

}
// ! Görev Tamamlandığında İlgili İtem'a Class Ekleme
function addCheckedClass(e) {
    e.target.classList.toggle('checked')
}
// ! Seçilen Görevi Dom'dan ve Local Storage'dan silme
function deleteItem(e) {
    if (confirm(e.target.parentElement.innerText + " İsimli görevi silmek istediğine emin misin ?")) {

        let liValue = e.target.parentElement.innerText;

        let localdizi = JSON.parse(localStorage.getItem('gorevler'))

        let deleteIndex = localdizi.indexOf(liValue);

        localdizi.splice(deleteIndex, 1)

        localStorage.setItem('gorevler', JSON.stringify(localdizi))

        e.target.parentElement.remove();

    }
}
// ! Tüm Görevleri Dom'dan ve Local Storage'dan silme
function deleteAll() {

    if (ulDOM.childElementCount == 0) {
        alert("Silinecek Eleman Bulunamadı")
    } else if (confirm("Tüm görevler silinecek, Emin misin ?")) {

        let liTags = document.querySelectorAll("#list li");
        liTags.forEach(item => {
            item.remove();
        });
        localStorage.clear();
    }

}
// ! Local storage'dan sayfa yüklendiğinde görevleri yükleme
(function localStorageOku() {
    let localdizi;
    if (localStorage.getItem('gorevler') === null) {
        localdizi = [];
    } else {
        localdizi = JSON.parse(localStorage.getItem('gorevler'))
    }
    localdizi.forEach(function (gorev) {

        // create li element
        let liTag = document.createElement('li')
        liTag.innerText = gorev;
        ulDOM.appendChild(liTag);

        // create span tag (delete item btn)
        let deleteItemBtn = document.createElement('span')
        deleteItemBtn.innerHTML = '<i class="fas fa-times noclick"></i>'
        deleteItemBtn.className = 'close'
        liTag.appendChild(deleteItemBtn)


        // Add Checked Class li
        liTag.addEventListener('click', addCheckedClass)

        // Remove Li Tag onclick X
        deleteItemBtn.addEventListener('click', deleteItem)

    })
})();
// ! Local storage'a eklenen yeni görevleri gönderme
function localStorageEkle(yeniGorev) {
    let localdizi;
    if (localStorage.getItem('gorevler') === null) {
        localdizi = [];
    } else {
        localdizi = JSON.parse(localStorage.getItem('gorevler'))
    }

    localdizi.push(yeniGorev)

    localStorage.setItem('gorevler', JSON.stringify(localdizi))
}