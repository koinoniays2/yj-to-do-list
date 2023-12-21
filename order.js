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
        const mouseY = e.clientY;

        const siblings = [...table.querySelectorAll("tr:not(.dragging)")];
        let nextSibling = null;

        for (const sibling of siblings) {
            const rect = sibling.getBoundingClientRect();
            const siblingMiddleY = rect.top + rect.height / 2;

            if (mouseY < siblingMiddleY) {
                nextSibling = sibling;
                break;
            }
        }
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
    table.addEventListener("dragenter", () => {
        table.addEventListener("drop", (e) => {
            e.preventDefault();
            const newTr = document.querySelectorAll("tr");
            reSave(newTr);
        });
    });


    // tr을 받아오기 위해 저장 버튼으로 리로드
    const save = document.querySelector(".save-list");
    save.addEventListener("click", () => { location.reload(); })
});