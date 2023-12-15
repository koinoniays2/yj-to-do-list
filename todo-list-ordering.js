window.addEventListener("load", function() {
    const toDoForm = document.querySelector("#todo-form");
    const toDoInput = document.querySelector("#todo-form input");
    const toDoList = document.querySelector("#todo-list");
    // 값(객체)가 저장 될 배열
    let saveToDo = [];

    // submit 리스너
    toDoForm.addEventListener("submit", function(e){
        e.preventDefault(); // submit의 기본 행위(새로고침 되는 것) 막기

        /* input에 입력되어 submit된 값을 객체에 담기
        (삭제된 값을 Local storage에도 적용 시키기 위해) */
        const newToDo = {
            text: toDoInput.value,
            id: Date.now() } // 임의 id값
        toDoInput.value = ""; // submit 후 input에 남은 값 비우기

        saveToDo.push(newToDo); // 배열에 값(객체) 넣기
        localStorage.setItem("todos", JSON.stringify(saveToDo)); //local storage에 배열 담기
        //화면에 submit 된 값 그려주기
        paintToDo(newToDo);
    });

    // 화면에 그리기 함수
    function paintToDo(newToDo) {
        const li = document.createElement("li");
        li.setAttribute("id", newToDo.id); //submit 된 객체의 id속성을 li의 id로 저장
        const span = document.createElement("span");
        const delBtn = document.createElement("button");
        delBtn.innerText = "❌"; // 이모지: window + ;
        li.appendChild(span);
        li.appendChild(delBtn);
        span.innerText = newToDo.text; // 매개변수로 들어온 객체의 text값을 그린다.
        toDoList.appendChild(li);

        // 삭제 버튼 리스너
        delBtn.addEventListener("click", function(e) {
            del = e.target.parentElement;
            del.remove();
            //삭제 후 Local storage에 재배열
            saveToDo = saveToDo.filter((item) => item.id != parseInt(del.id));
            /* 객체에 남아있는 item.id와 타겟 된 li의 id가 같지 않은 것들
            즉 타겟되지 않은 id들을 filter로 재배열하여 Local storage에 다시 저장 */
            localStorage.setItem("todos", JSON.stringify(saveToDo));

        });
    }

    // Local storage에 저장된 값을 화면에 뿌려주기
    const savedToDos = localStorage.getItem("todos"); // localStorage에 저장된 key로 값을 가져온다.
    if(savedToDos !== null) { // 값이 있으면 빈 배열에 넣어준다.
        saveToDo = JSON.parse(savedToDos);
        saveToDo.forEach((item) => paintToDo(item)); //저장된 값을 화면에 뿌려주기 위해 forEach문 사용후 호출
    }
});