const bodyParser = require("body-parser");

// Your Code Here
//My original code because I could not figure it out
/*async function getBooks(){
    let response = await fetch('http://localhost:3001/listBooks');
    let result = await response.json();
    console.log(result);
    return result;
}

function getTitles(){
    let books = getBooks();
    let titleArr = [];
    for(let i=0; i<books.length; i++){
        titleArr.push(books[i].title);
    }
    console.log(titleArr);
    return titleArr;
}

const ul = document.createElement('ul');
let titles = getTitles();
for(let j=0; j<titles.length; j++){
    let li = document.createElement('li');
    li.textContent = titles[j];
    let input = document.createElement('input');
    input.type = 'text';
    li.append(input);
    let save = document.createElement('button');
    save.textContent = 'Save';
    save.class = 'save';
    li.append(save);
    ul.append(li);
}
body.append(ul);

let saveButtons = document.querySelectorAll('.save');
for(let a=0; a<saveButtons.length; a++){
    saveButtons[a].addEventListener('click', save);
}

async function save(){
    let response = await fetch('http://localhost:3001/listBooks', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({quantity: input})
    })
}*/

//Solution Code

async function main(){
    let response = await fetch('http://localhost:3001/listBooks');
    let books = response.json();
    books.forEach(renderBook);
}

function renderBook(book){
    let root = document.querySelector('#root');

    let li = document.createElement('li');
    li.textContent = book.title;

    let quantityInput = document.createElement('input');
    quantityInput.value = book.quantity;

    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';

    saveButton.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
    })

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', () => {
        fetch('http://localhost:3001/removeBook', {
            method: 'DELETE'
        })
    });

    li.append(quantityInput, saveButton, deleteButton);

    root.append(li);
}

main();