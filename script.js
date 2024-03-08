    const addBookMainBtn = document.querySelector("main > .add-book-btn");
    const addBookFormBtn = document.querySelector("form > .add-book-btn");
    const addBookDialog = document.querySelector("#add-book-dialog");
    const deleteBookDialog = document.querySelector("#delete-book-dialog");
    const yesBtn = document.querySelector(".yes-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const form = document.querySelector("form");
    const book = document.querySelector("#book");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const readStatus = document.querySelector("#read-status");
    const table = document.querySelector("table");
    let currentBookIdx = -1;
    let books = [
        {
            name: "Book A",
            author: "Author A",
            pages: 100,
            status: false
        },
        {
            name: "Book B",
            author: "Author B",
            pages: 200,
            status: true
        },
        {
            name: "Book C",
            author: "Author C",
            pages: 300,
            status: true
        }
    ];
    
    books.forEach((book) => addBook(book));

    //======================= functions =======================

    class Book {
        constructor(name, author, pages, status) {
            this.name = name;
            this.author = author;
            this.pages = pages;
            this.status = status;
        }
    }

    addBookMainBtn.addEventListener("click", () => {
        addBookDialog.showModal();
    });
    
    addBookFormBtn.addEventListener("click", (e) => {
        if (!book.value.trim().length) book.value = "";
        else {
            e.preventDefault();
            let bookObj = new Book(book.value, author.value, pages.value, readStatus.checked);
            books.push(bookObj);
            addBook(bookObj);
            form.reset();
            addBookDialog.close();
        }
    });
    
    table.addEventListener("click", (e) => {

        if (e.target.tagName !== 'BUTTON') return; // not a button
        
        const bookName = e.target.parentNode.parentNode.childNodes[0].textContent;
        currentBookIdx = books.findIndex((item) => {
            return item.name == bookName;
        });
        const bookObj = books[currentBookIdx];
        
        // delete button clicked, delete the row of selected book
        if (e.target.classList.contains("delete-btn")) {
            deleteBookDialog.showModal(); 
        }
        
        // status button clicked, change read status of selected book
        else if (e.target.classList.contains("status-btn")) {
            bookObj.status = !bookObj.status;
            e.target.textContent = bookObj.status ? "READ" : "NOT READ";
            e.target.style.backgroundColor = bookObj.status ? "lightgreen" : "red";
        }
    });
    
    yesBtn.addEventListener("click", deleteBook);
    cancelBtn.addEventListener("click", () => { deleteBookDialog.close(); });

    function deleteBook() {
        books.splice(currentBookIdx, 1); // remove book from array
        const rowToDelete = table.childNodes[currentBookIdx + 4]; 
        table.removeChild(rowToDelete); // remove book row
        deleteBookDialog.close();
    }

    function addBook(book) {
        const newTableRow = document.createElement("tr");
        
        const tdBook = document.createElement("td");
        tdBook.textContent = book.name;
        newTableRow.appendChild(tdBook);
        
        const tdAuthor = document.createElement("td");
        tdAuthor.textContent = book.author;
        newTableRow.appendChild(tdAuthor);
        
        const tdPages = document.createElement("td");
        tdPages.textContent = book.pages;
        newTableRow.appendChild(tdPages);
        
        const tdStatus = document.createElement("td");
        tdStatus.classList.add("td-status");
        const statusBtn = document.createElement("button");
        statusBtn.type = "button";
        statusBtn.classList.add("status-btn");
        statusBtn.textContent = book.status ? "READ" : "NOT READ";
        statusBtn.style.backgroundColor = book.status ? "lightgreen" : "red";
        tdStatus.appendChild(statusBtn);
        newTableRow.appendChild(tdStatus);
        
        const tdDelete = document.createElement("td");
        tdDelete.classList.add("td-delete");
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "DELETE";
        tdDelete.appendChild(deleteBtn);
        newTableRow.appendChild(tdDelete);
        
        table.appendChild(newTableRow);
    }