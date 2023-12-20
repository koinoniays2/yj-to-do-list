window.addEventListener("load", function () {
    const toDoForm = document.querySelector("#todo-form");
    const toDoInput = document.querySelector("#todo-form input");
    const toDoList = document.querySelector("#todo-list");
    // 값(객체)가 저장 될 배열
    let saveToDo = [];

    // submit 리스너
    toDoForm.addEventListener("submit", function (e) {
        e.preventDefault(); // submit의 기본 행위(새로고침 되는 것) 막기

        /* input에 입력되어 submit된 값을 객체에 담기
        (삭제된 값을 id로 비교하여 Local storage에 적용 시키기 위해) */
        const newToDo = {
            text: toDoInput.value, // 입력된 값
            id: Date.now()
        } // 임의 id값
        toDoInput.value = ""; // submit 후 input에 남은 값 비우기

        saveToDo.push(newToDo); // 배열에 값(객체) 넣기
        localStorage.setItem("todos", JSON.stringify(saveToDo)); // local storage에 배열 저장
        // 화면에 submit 된 값 그려주기
        paintToDo(newToDo);
    });

    // Local storage에 저장된 값을 화면에 뿌려주기
    const savedToDos = localStorage.getItem("todos"); // localStorage에 저장된 key로 값을 가져온다.
    if (savedToDos !== null) { // 값이 있으면 빈 배열에 넣어준다.
        saveToDo = JSON.parse(savedToDos);
        saveToDo.forEach((item) => paintToDo(item)); //저장된 값을 화면에 뿌려주기 위해 forEach문 사용후 호출
    }

    // 화면에 그리기 함수
    function paintToDo(newToDo) {
        const tr = document.createElement("tr");
        tr.setAttribute("id", newToDo.id); //submit 된 객체의 id속성을 li의 id로 저장
        tr.setAttribute("draggable","true");
        const th = document.createElement("th");
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        th.appendChild(input);
        tr.appendChild(th);
        const td = document.createElement("td");
        const span = document.createElement("span");
        span.innerText = newToDo.text; // 매개변수로 들어온 객체의 text값을 넣는다.
        td.appendChild(span);
        tr.appendChild(td);
        toDoList.appendChild(tr);

        // td를 클릭했을 때 체크 되게 하기
        td.addEventListener("click", function(e){
            let input = e.currentTarget.parentNode.querySelector('input');
            input.checked = !input.checked;
            /* 클릭할 때 마다 토글
            클릭하면 초기 input.checked의 값인 false가 !false되어 true로 변하고 체크가된다. */
        });
    }
    
    // 삭제 버튼 리스너
    const delBtn = document.querySelector(".del-list");
    delBtn.addEventListener("click", function () {
        // 체크 된 체크박스들 가져오기
        let checkboxes = toDoList.querySelectorAll('input[type="checkbox"]:checked');

        if (checkboxes.length === 0) {
            alert("삭제할 리스트를 선택하세요.");
            return;
        };
        // 체크 된 박스들 값 뽑아내기
        checkboxes.forEach((item) => {
            let selectList = item.parentNode.parentNode; // 뽑아 낸 체크박스의 부모(tr) 값 저장
            selectList.remove(); // 삭제

            //삭제 후 Local storage에 재배열
            saveToDo = saveToDo.filter((item) => item.id != parseInt(selectList.id));
            localStorage.setItem("todos", JSON.stringify(saveToDo));
            /* 객체에 남아있는 item.id가 체크 된 tr의 id와 같지 않은 것들만 재배열하여 저장
            즉 체크되지 않은 id들을 filter로 재배열하여 Local storage에 다시 저장 */
        });
        alert("선택한 리스트가 삭제되었습니다.");
    });
});