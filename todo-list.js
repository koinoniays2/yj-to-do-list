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
    e.target.parentElement.remove();
}

// 화면에 그리기 함수
function paintToDo(newToDo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");

    // 삭제 버튼 click 리스너
    delBtn.addEventListener("click", deleteToDo);
    
    delBtn.innerText = "❌"; // 이모지: window + ;
    li.appendChild(span);
    li.appendChild(delBtn);
    span.innerText = newToDo;
    toDoList.appendChild(li);
}



// 서브밋 함수
function handleToDoSubmit(e) {
    e.preventDefault(); // form을 submit이 되면 새로고침 된다. submit의 기본 행위 막기
    
    const newToDo = toDoInput.value; // input에 입력된 값 저장
    toDoInput.value = ""; // 저장 후 남아있는 value를 지우기 위해
    
    paintToDo(newToDo);
    
    //웹 브라우저가 제공하는 local storage에 저장
    toDos.push(newToDo); // 값을 배열에 저장
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
