export class Book {
    constructor(title = "None", author = "None", pages = 0, status = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

export class Libary {
    constructor() {
        this.books = []
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