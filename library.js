const userInputTitle = document.getElementById('input-box-title');
const userInputAuthor = document.getElementById('input-box-author');
const userInputPages = document.getElementById('input-box-pages');
const userInputRead = document.getElementById('input-box-read');
const addBtn = document.getElementById('input-btn-add');
const viewBtn = document.getElementById('input-btn-view');
const resultDisplay = document.getElementById('result-display');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const powerBroker = new Book("The Power Broker", "Robert Caro", 1200, true);
let myLibrary = [powerBroker];

resultDisplay.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-btn')) {
        const bookCard = e.target.closest('.book-card');
        if (bookCard) {
            const index = Array.from(resultDisplay.children).indexOf(bookCard);
            if (index > -1) {
                myLibrary.splice(index, 1);
                displayBooks(); 
            }
        }
    }
});

resultDisplay.addEventListener('click', function(e) {
    if (e.target.classList.contains('read-btn')) {
        const bookCard = e.target.closest('.book-card');
        if (bookCard) {
            const index = Array.from(resultDisplay.children).indexOf(bookCard);
            if (index > -1) {
                myLibrary[index].read = !myLibrary[index].read;
                displayBooks();
            }
        }
    }
});

const addNewBook = () => {
    const title = userInputTitle.value;
    const author = userInputAuthor.value;
    const pages = userInputPages.value;
    const read = userInputRead.checked;

    if (title && author && pages) { 
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);

       
        userInputTitle.value = '';
        userInputAuthor.value = '';
        userInputPages.value = '';
        userInputRead.checked = false;

        displayBooks();
    } else {
        alert('Please fill in all fields.');
    }
};

const displayBooks = () => {
    resultDisplay.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <button class="remove-btn">X</button>
            <h2 class="book-title">${book.title}</h2>
            <p class="book-author">by ${book.author}</p>
            <p class="book-pages">${book.pages} pages</p>
            <p class="book-read-status">Read: ${book.read ? 'Yes' : 'No'}</p>
            <button class="read-btn">Read?</button>
        `;
        resultDisplay.appendChild(bookCard);
    });
};

addBtn.addEventListener("click", addNewBook);
viewBtn.addEventListener("click", displayBooks);

displayBooks();