/* Part 01 - Create Date Object */

/* 1. no parameter, display current time */
const today1 = new Date()    //Date() เป็น ชื่อ class
console.log(today1)
console.log(today1.getTime()) //return millisecond
console.log(today1.getDay())
console.log(today1.getDate())
console.log(today1.getMonth())
/* มี method get อื่นๆอีก */

/* 2. input parameter - millisecond */
const today2 = new Date(Date.now()) 
console.log(today2) 

const now = Date.now() //return millisecond of current datetime
console.log(now)  //ได้ค่าเป็น millisecond

const now2 = new Date(now)
console.log(now2)

/* 3. input parameter - date string */
const utcDate = new Date("2025-11-18T10:30:00z")     
console.log(utcDate)      //2025-11-18T10:30:00.000Z     //Z ที่ต่อท้ายคือ UTC ตามเวลามาตราฐานสากล
const localDate = new Date("2025-11-18T10:30:00")
console.log(localDate)    //2025-11-18T03:30:00.000Z
 
/* 4. input parameter - date/time parameter */
const myDate1 = new Date(2025, 11, 10, 11, 15, 25) //year, monthIndex, day, hh, mm, ss
console.log(myDate1)     //2025-12-10T04:15:25.000Z
const myDate2 = new Date(2025, 12, 10, 11, 15, 25) //ต้องระวัง monthIndex เพราะค่ามันคือ 0-11 ใส่จะเป็น 12 จะมองเป็น 0 ใหม่
console.log(myDate2)     //2025-12-10T04:15:25.000Z

//////////////////////////////////////////////

/* Part 02 - Compare date time */
/* 1. compare เท่ากับ */
const startBooking = new Date("2025-11-15T12:00:00")
const stopBooking = new Date("2025-11-16T12:00:00")

console.log(startBooking.getTime())
console.log(stopBooking.getTime())

console.log(startBooking === stopBooking) //ถ้าไม่เทียบด้วย millisecond จะได้ false เสมอ
console.log(startBooking.getTime() === stopBooking.getTime()) //ถ้าเทียบด้วย millisecond วันเวลาเดียวกันจะได้ true
//เช็ค === (3 เท่ากับ) ได้ แต่ต้อง .getTime() 

/* 2. compare >, <, <=, >= date objects */
//สามารถเปรียบเทียบได้เลย เพราะจะ auto คำนวนเป็น millisecond
//แต่ถ้าเป็นคนละ timezone ตรงใช้ .getTime() แปลงให้เป็น millisecond ก่อนค่อยเปรียบเทียบ
console.log(startBooking > stopBooking) //false
console.log(startBooking < stopBooking) //true

const bookingtime = new Date("2025-11-16T12:00:00")
if (bookingtime >= startBooking && bookingtime <= stopBooking)
  console.log("valid booking time")
else console.log("invalid booking time")
//ถ้าเวลาของ bookingtime = stopBooking ก็ยังถือว่า valid booking time

//////////////////////////////////////////////

/* Part 03 - date time format */
const startBooking2 = new Date("2025-11-15T12:00:00")
const stopBooking2 = new Date("2025-11-16T12:00:00")

/*
1. toISOString()          ใช้ option ไม่ได้
2. toString()             ใช้ option ไม่ได้
3. toLocaleString()       ใช้ option ได้ 
4. Intl.DateTimeFormat()  ใช้ option ได้

toLocaleString กับ Intl.DateTimeFormat ใช้แทนกันได้
*/

console.log(stopBooking2.toISOString())    //แปลงเป็น UTC ก่อน
console.log(stopBooking2.toString())       //แสดงตาม local ของเครื่อง
console.log(
  stopBooking2.toLocaleString("th-TH", {   //แสดงตาม local ของเครื่องแต่จัด format ได้
    dateStyle: "full",       //ใส่ format ใช้ option ได้
    timeStyle: "full",
  })
) //11/16/2025, 12:00:00 PM

const formatter = Intl.DateTimeFormat("th-TH", {   //th-TH คือ ภาษา-พื้นที่
  dateStyle: "long",         //ใส่ format ใช้ option ได้
  timeStyle: "long",
  timeZone: "Asia/Bangkok",
})
console.log(formatter.format(stopBooking2))    //16 November 2025 at 12:00:00 GMT+7

//////////////////////////////////////////////
 
/* Part 04 - ดึงข้อมูล timezone และ การตั้งค่าภาษาของผู้ใช้ */
//ใช้ resolvedOptions() function
const systemOptions = new Intl.DateTimeFormat().resolvedOptions()
console.log(systemOptions.timeZone) // e.g., " Asia/Bangkok"
console.log(systemOptions.locale) // e.g., "th-TH" or "en-GB"
 
 