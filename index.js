// 변수
const name = "최연성" 
// name = "연성" const는 상수변수로 값 변경 불가
let hobby = "게임"
hobby = "음악듣기"
// var address = "대구"
// var address = "서울" // var는 값을 덮어쓴다. (오류가 나지 않기 때문에 지양)
console.log(name)
console.log(hobby)
// console.log(address)
const a = 10
const b = "20"
// 다른 언어와 달리 JS는 타입선언을 하지 않아도 결과가 나온다.
console.log(a + b)
// 타입 확인
console.log(typeof name)
console.log(typeof a)
console.log(typeof b)

// "", '', ``
//console.log("나의 이름은 " + name + "이고, 나의 취미는 " + hobby + "입니다.")
//console.log(`나의 이름은 ${name}이고, 나의 취미는 ${hobby}입니다.`)

// 숫자 배열
const arr = [1, 2, 3]
console.log(arr[0])
const arr2 = ["최연성", "연성", "최"]
console.log(arr2)
const arr3 = ["최연성", 1, 2, "연성"]
console.log(arr3)

// 객체
const obj1 = {name: "최연성", hobby: "게임"}
console.log(obj1)
const obj2 = {name: "연성", hobby: "유튜브시청"}

const arr4 = [
    {name: "최연성", hobby: "게임"},
    {name: "연성", hobby: "유튜브시청"},
    3
]
console.log(arr4[0].hobby)