// Python backend fetch via flask

let getData = 'https://jsonplaceholder.typicode.com/users';

const itemCard = document.querySelector("[data-item-template]");

fetch(getData)
    .then(res => res.json())
    .then(data =>{
        const item = itemCard.content.cloneNode(true);
        console.log(item);
    })

