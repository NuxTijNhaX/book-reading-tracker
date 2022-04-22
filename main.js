/* Define classes */
class Book {
    constructor(title = "None", author = "None", pages = 0, status = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

class Libary {
    constructor() {
        this.books = []
    }

    add(newBook) {
        // if(!isExist(newBook)) {
            this.books.push(newBook);
        //}
    }

    remove(title) {
        this.books = this.books.filter(book => book.title !== title)
    }

    get(title) {
        return this.books.find(book => book.title === title)
    }

    isExist(newBook) {
        return this.books.some(book => book.title === newBook.title)
    }
}

const libary = new Libary();

const addBookForm = document.getElementById("addBookForm");
const addBookBtn = document.getElementById("addBookBtn");
const overlay = document.getElementById("overlay");
const booksGrid = document.getElementById("booksGrid");
const submitBook = document.getElementById("submitBook");

const createBookCard = (newBook) => {
    /* Mount */
    const booksGrid = document.getElementById("booksGrid");
    const card = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const btnGroup = document.createElement("div");
    const readedStatus = document.createElement("button");
    const removeBtn = document.createElement("button");

    card.classList.add("book-card");
    btnGroup.classList.add("btn-group");
    readedStatus.classList.add("btn");
    removeBtn.classList.add("btn");

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    btnGroup.appendChild(readedStatus);
    btnGroup.appendChild(removeBtn);
    card.appendChild(btnGroup);
    booksGrid.appendChild(card);

    title.textContent = `"${newBook.title}"`;
    author.textContent = `- ${newBook.author} -`;
    pages.textContent = `${newBook.pages} pages`;
    removeBtn.textContent = "Remove";
    if(newBook.status) {
        readedStatus.textContent = "Readed";
        readedStatus.classList.add("btn-light-green");
    } else {
        readedStatus.textContent = "Not Readed";
        readedStatus.classList.add("btn-light-red");
    }

    /* Event */
    removeBtn.onclick = removeBook;
    readedStatus.onclick = changeReadingStatus;

    /* Style */
    title.style.fontWeight = "bold";
    author.style.fontStyle = "italic";
    pages.style.fontSize = "14px";
}

const openAddingBookForm = () => {
    addBookForm.classList.add("active");
    overlay.classList.add("active");
}

const closeAddingBookForm = () => {
    addBookForm.classList.remove("active");
    overlay.classList.remove("active");
}

const createBookFromForm = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById('isRead').checked

    return new Book(title, author, pages, isRead);
}

const addBook = (e) => {
    e.preventDefault();
    
    libary.add(createBookFromForm());
    updateBooksGrid();
    closeAddingBookForm();
}

const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', '');

    libary.remove(title);
    updateBooksGrid();
}

const resetBooksGrid = () => {
    booksGrid.innerHTML = '';
}

const updateBooksGrid = () => {
    resetBooksGrid();
    for (let book of libary.books) {
      createBookCard(book);
    }
}

const changeReadingStatus = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', '');

    const currentBook = libary.get(title);
    currentBook.status = !currentBook.status;
    updateBooksGrid();
}

addBookBtn.onclick = openAddingBookForm;
overlay.onclick = closeAddingBookForm;
submitBook.onclick = addBook;