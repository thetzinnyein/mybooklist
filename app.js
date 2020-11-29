// Create Book Class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//Complete create book list

//Create Store Class

class store {

    //get book from localstorage 
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;

    }

    //add book to localstorage
    static addBook(book) {
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    //remove book from localStorage

    static removeBook(isbn) {
        const books = store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Create UI Class

class UI {
    static displayBooks() {
        const books = store.getBooks();
        //create function
        books.forEach((book) => UI.addBookTolist(book));

    }


    //import form data into table
    static addBookTolist(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>

        
        `;

        list.appendChild(row);
    }

    //delete table data from table
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    //create alert Function

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    //form data clear

    static clearFields() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

//Display book

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Add Book 

document.querySelector('#book-form').addEventListener('submit', (e) => {
        //prevent default value
        e.preventDefault();

        //Get form value

        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

        if (title === '' || author === '' || isbn === '') {
            UI.showAlert('please fill all field', 'danger');
        } else {
            //instantiate book

            const book = new Book(title, author, isbn);

            //add book to list
            UI.addBookTolist(book);


            // add book list to local storage
            store.addBook(book);

            // Add book alert
            UI.showAlert('Success Add Book', 'success')


            //clear field
            UI.clearFields();
        }
    })
    //Remove Book event
document.querySelector('#book-list').addEventListener('click', (e) => {
    //Remove Book from IU
    UI.deleteBook(e.target)

    //Remove book from store

    store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //delete alert
    UI.showAlert('Delete Book', 'danger');
})