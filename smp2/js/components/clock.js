const tag = '[time]'
const location = document.getElementsByClassName('location')
const time = location[0].getElementsByClassName('time')

function getTime(){
    function timeTrans(time){
       return time<10 ? `0${time}` : time
    }
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    time[0].innerText = `${timeTrans(hour)}:${timeTrans(minute)}:${timeTrans(second)}`

 }
export default{
   init(){
      getTime()
      setInterval(getTime, 1000)
   }


}