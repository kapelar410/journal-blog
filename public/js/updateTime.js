

setInterval(showTime, 1000); // Update the time every second %>

// display the current time on the homepage 
function showTime() {
    let time = new Date()
    let hours = time.getHours()
    let min = time.getMinutes()
    let sec = time.getSeconds()
    let am_pm = "AM"

    if (hours >= 12) {
        if (hours > 12) {
            hours -= 12
            am_pm = "PM"
        } else if (hours == 0) {
        hours = 12
        am_pm = "AM"
        }
    }
    // add zeros to the front of single digit for readability
    hours = hours < 10 ? "0" + hours : hours;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    let currentTime =  hours + ":" + min + ":" + sec + ":" + am_pm

    document.getElementById("current-time").innerHTML = currentTime
}

showTime(); // Call the function immediately %>