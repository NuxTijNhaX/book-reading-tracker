import { Book, Libary } from "./classes";

const libary = new Libary();

const addBookForm = document.querySelector(".addBookForm");
const addBookBtn = document.getElementById("addBookBtn");

addBookBtn.addEventListener("click", function() {
    addBookForm.style.display = "block";
});
