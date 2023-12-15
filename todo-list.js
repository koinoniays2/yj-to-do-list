const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

// local storage 저장 함수
let toDos = [];
function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos)); // localStorage에 저장(key, value)
    // stringify를 안하면 배열로 저장이 안됨
}
// 삭제버튼 함수
function deleteToDo(e) {
    li = e.target.parentElement;
    li.remove();
    // 삭제하고 남은것들만 재배열
    toDos = toDos.filter((item) => item.id !== parseInt(li.id)); 
    //남아있는 item.id와 삭제된 li.id가 같지않은 것들 즉, 삭제되지 않은것들
    saveToDos(); //localStorage에 다시 저장
}

// 화면에 그리기 함수
function paintToDo(newToDo) {
    const li = document.createElement("li");
    li.setAttribute("id",newToDo.id); //객체의 id값을 li속성의 id값으로 저장
    const span = document.createElement("span");
    const delBtn = document.createElement("button");

    // 삭제 버튼 click 리스너
    delBtn.addEventListener("click", deleteToDo);
    
    delBtn.innerText = "❌"; // 이모지: window + ;
    li.appendChild(span);
    li.appendChild(delBtn);
    span.innerText = newToDo.text;
    toDoList.appendChild(li);
}



// 서브밋 함수
function handleToDoSubmit(e) {
    e.preventDefault(); // form을 submit이 되면 새로고침 된다. submit의 기본 행위 막기
    
    // 삭제를 위해 값을 배열 객체에 담기 임의 id값: Date.now()
    const newToDoObj = {
        text: toDoInput.value, // input에 입력된 값 저장
        id: Date.now()
    }
    toDoInput.value = ""; // 저장 후 남아있는 value를 지우기 위해
    
    paintToDo(newToDoObj);
    
    //웹 브라우저가 제공하는 local storage에 임시 저장
    toDos.push(newToDoObj); // 값을 객체에 배열 저장
    saveToDos();
}

// form submit 리스너
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem("todos"); // local storage에서 key값으로 가져온다.
console.log(typeof(savedToDos)); 
/* JSON.stringify하지 않고 저장했을 경우, Value에 배열이 아닌 문자열로 저장되고 타입은 object로 나온다.
localStorage는 String만 저장가능하다. */
if(savedToDos !== null) {
    const parsedTodos = JSON.parse(savedToDos); // String으로 저장 되기때문에 원래 입력한 값으로 받기위해 parse해준다.
    toDos = parsedTodos; //local storage에 저장된 값이 있으면 빈 배열에 넣어준다.
    toDos.forEach((item) => paintToDo(item));
}

