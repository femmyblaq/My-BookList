//create a class book list
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI classes for displaying books
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        //loop through each
        books.forEach((book) => UI.addBookToList(book));
    }
    //add book to table
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class = "btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);
    }
    //UI for delete book
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

//storage class handles file storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));

            return books;
        }
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books'.JSON.stringify(books));
    }
}

//event to display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    (e).preventDefault();
    //book value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate books
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('please fill in all fields', 'danger');
    } else {
        const book = new Book(title, author, isbn);

        //add book to list
        UI.addBookToList(book);
        UI.showAlert('Book Added', 'success');
        //add book to store
        Store.addBook(book);
        //clear fields
        UI.clearFields();

    }

})



//remove book from list
document.querySelector('#book-list').addEventListener('click', (e) => {
    //delete book
    UI.deleteBook(e.target);
    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    //show success alert
    UI.showAlert('Book Removed', 'success');
})