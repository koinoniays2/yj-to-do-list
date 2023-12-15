window.addEventListener("load", function() {
    const toDoForm = document.querySelector("#todo-form");
    const toDoInput = document.querySelector("#todo-form input");
    const toDoList = document.querySelector("#todo-list");
   
    // local storage 저장
    let saveToDo = [];
    
    // 화면에 그리기 함수
    function paintToDo(newToDo) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const delBtn = document.createElement("button");
        delBtn.innerText = "❌"; // 이모지: window + ;
        li.appendChild(span);
        li.appendChild(delBtn);
        span.innerText = newToDo; // 매개변수로 들어온 값을 그린다.
        toDoList.appendChild(li);

        saveToDo.push(newToDo);
        localStorage.setItem("todos", JSON.stringify(saveToDo));

        // 삭제 버튼 리스너
        delBtn.addEventListener("click", function(e) {
            e.target.parentElement.remove();
        });
    }

    // submit 리스너
    toDoForm.addEventListener("submit", function(e){
        e.preventDefault(); // submit의 기본 행위(새로고침 되는 것) 막기
        const newToDo = toDoInput.value; // input에 입력되어 submit된 값 담기
        toDoInput.value = ""; // submit 후 input에 남은 값 비우기

        //화면에 그려주기
        paintToDo(newToDo);
        // localStorage.setItem("todos", JSON.stringify(saveToDo));
    });
    const savedToDos = localStorage.getItem("todos");
    if(savedToDos !== null) {
        saveToDo = JSON.parse(savedToDos);
        saveToDo.forEach((item) => paintToDo(item));
    }
});