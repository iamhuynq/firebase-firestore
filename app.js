const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

db.collection('cafes').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderList(doc); 
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value,
    })
    form.name.value = '';
    form.city.value = '';
});

const renderList = doc => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const city = document.createElement('span');
    const cross = document.createElement('div');
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click', e => {
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    });
}