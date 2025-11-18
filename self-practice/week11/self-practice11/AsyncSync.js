/* Part 01 - Asynchronous vs Synchronous */
// -> Synchronous
// คำสั่งถัดไปจะไม่ถูกประมวลผลถ้าคำสั่งก่อนหน้ายังไม่ได้ผลลัพธ์
console.log("starting Synchonous...")
console.log("working Synchonous...")
console.log("ending Synchonous...") //ได้ start work end

// -> Asynchrnous
// เมื่อมีงานที่ต้องใช้เวลาและไม่เสร็จในทันทีมันจะข้ามไปทำงานถัดไป และเมื่อรอเสร็จถึงกลับมาทำ
// เป็นงานที่รอได้ไม่มีผลกระทบซึ่งกันและกัน
console.log("starting Asynchonous...")
setTimeout(()=> console.log("working Asynchronous..."), 5000) 
console.log("ending Asynchonous...") //ได้ start end work
// setTimeout() เป็น Asynchronous function ที่เอาไว้รอเวลาตามมิลลิsec เมื่อรอเสร็จถึงจะเรียก callback function

// มีวิธีที่เปลี่ยน Asynchronous เป็น Synchronous

//////////////////////////////////////////////////////////////////////////////////////////////////

/* Part 02 - Promises */
// เป็นคำสัญญาว่าจะทำงานจนได้ผลลัพธ์ที่เป็น fail หรือ success แล้วแสดงผลออกมา
// เป็น Asynchronous function เหมือน setTimeout() แต่มีความหมายมากกว่าตรงที่ promises เป็นชื่อ class 
// เมื่อใดก็ตามที่มีการสร้างฟังก์ชันที่คืนค่าเป็น Promises object ฟังก์ชันนั้นจะกลายเป็น Asynchronous
/*
Promises have three states:
-> pending: initial state (เมื่อเริ่มต้นทำงาน ยังไม่ถูกทำให้ fulfilled และยังไม่ถูก rejected)
-> fulfilled: completed successfully
-> rejected: failed

Promise((resolve,reject) => {}) | resolve reject เป็น callback function
-> resolve เมื่อสำเร็จจะให้ทำอะไร
-> reject เมื่อไม่สำเร็จจะให้ทำอะไร
*/

// function async ที่ return promise
// ตัวอย่างการไม่จัดการกับ promise ที่จะสร้างปัญหาให้กับโปรแกรม
// ปัญหาคือ 1.เรียกฟังก์ชันที่มีการคืนค่าเป็น Promise
function doSomething(hasResource){
    return new Promise((resolve,reject)=>{ //resolve,reject เป็น parametor ของ promise เป็นตัวอื่นไม่ได้
        setTimeout(()=>(hasResource ? resolve("done") : reject("fail")), 5000)
    })
}
console.log("starting...")
const workStatus = doSomething(false)
console.log(workStatus) //Promise { <pending> }
console.log("ending...")
/*
ผลลัพธ์ได้ = 
starting...
Promise { <pending> }
ending...
และ fail, throw exception

- ถ้ามีการจะทำอะไรกับการรับค่าของ function ที่ return promise มันจะคืนค่ามาเป็น pending (ยังไม่ได้ค่า) แล้วจะรอเวลา 
- ดังนั้น FetchAPI ที่เรียกจะ return เป็น promises ที่ res. เป็น object
*/

//////////////////////////////////////////////////////////////////////////////////////////////////

/* Part 03 - Knowlegde */
// 1.ถ้า fucntion เป็น Asynchronous จะเขียนโปรแกรมที่เป็น Synchronous ไม่ได้
// 2.ถ้า function return Promises | Promises have 3 state ซึ่งไม่มีการจัดการกับโปรแกรมที่คืนเป็น Promises เลย!!

//////////////////////////////////////////////////////////////////////////////////////////////////

/* Part 04 - handle promise 2 way เปลี่ยน Async เป็น Sync*/
// -> 1. .then().catch() 
// -> 2. async-await

/* 1. .then().catch() */
// รอข้างหน้าให้เสร็จแล้ว .then ต่อเป็น callback function แล้วอะไรที่อยู่หลัง .then ก็ต้องรอให้ .then เสร็จ
console.log("starting...")
doSomething(false).then((result)=>{ //dosomething จะ success หรือ fail ให้เอาผลลัพธ์มาใส่ที่ result
        console.log("working...")
        console.log(`work status = ${result}`)
        console.log("ending...")
    })                             //.then ต้องรอข้างหน้าเสร็จถึงจะทำ กลายเป็น Sync
    .catch((error)=>{
        console.log(error)
    }) 
/*
ผลลัพธ์ doSomething(true) = 
starting...
working...
work status = done
ending...

ผลลัพธ์ doSomething(false) = 
starting...
fail  ---> ตรงนี้จะแสดงได้สวยตามที่เราหยุดโปรแกรมด้วย .catch เป็นการ handle error
*/

/* 2. async-await */
// เมื่อไหร่ใช้ await ต้องอยู่ภายใน async function อยู่ลอยๆไม่ได้
async function working(){
    console.log("starting...")
    try {   //คำสั่งที่มีความเสี่ยงทั้งหมดให้อยู่ใน try และดูว่ามีผลต่อเนื่องกับคำสั่งก่อนหน้าไหม
        const workStatus = await doSomething(true)  //ใส่ await ไว้หน้า return promises เลย
        console.log(workStatus)
        console.log("ending...")
    } catch (error) {
        console.log(error)
    }
}
working()
/*
ผลลัพธ์ได้เหมือน .then().catch()
*/

//////////////////////////////////////////////////////////////////////////////////////////////////

/* Part 05 - REST APIs */
//เป็นวิธีหนึ่งในการส่งข้อมูลไป server ผ่าน http protocol
//format JSON 
//ทำ CRUD ได้

/*
fetch (resurce [, init]) เป็น method ไว้ติดต่อ server 
- resource คือ endpoint(URL)
- init คือ option ทั้งหมด พวก method headers body
!!fetch return promises!!
*/

//json() json function จะ return promise ทำหน้าที่แปลง json string เป็น javascript object