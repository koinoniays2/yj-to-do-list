window.addEventListener("load", function () {
    const table = document.querySelector("#todo-list");
    const trs = Array.from(table.children); // 또는 [...table.children];
    console.log(trs);
    let toDos = [];
    
    trs.forEach((tr) => {
        tr.addEventListener("dragstart", () => {
            tr.classList.add("dragging");
        });
        tr.addEventListener("dragend", () => {
            tr.classList.remove("dragging");
        });
    })

    const initSortableList = e => {
        e.preventDefault();
        const draggingItem = table.querySelector(".dragging");
        const siblings = [...table.querySelectorAll("tr:not(.dragging)")];
        let nextSibling = siblings.find((sibling) => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });
        table.insertBefore(draggingItem, nextSibling);
    };

    function savedToDos() {
        localStorage.setItem("todos", JSON.stringify(toDos));
    }

    function reSave(newTr) {
        toDos = [];
        newTr.forEach((item) => {
            const text = item.querySelector("span");
            const newToDoObj = {
                text: text.innerText,
                id: item.id
            };
            toDos.push(newToDoObj);
        });
        savedToDos();
    };


    table.addEventListener("dragover", initSortableList)
    table.addEventListener("dragenter", (e) => { e.preventDefault(); });
    table.addEventListener("drop", () => {
        const newTr = document.querySelectorAll("tr");
        reSave(newTr);
    });
});