import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
let posts = [];

function showDate() {
    let d = new Date();
    let day = d.getDate()
    let month = d.getMonth()
    let year = d.getFullYear()
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    let currentDate = day + "-" + month + "-" + year;
    return currentDate
}

// setInterval(showTime, 1000);

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
    hours = hours < 10 ? "0" + hours : hours;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    return hours + ":" + min + ":" + sec + ":" + am_pm
}

// setInterval(() => {
//     // Do nothing here if you're not using Socket.IO
// }, 1000);

let date = showDate()

console.log(date)

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// renders homepage with current date
app.get("/", (req, res) => {
    // const currentTime = showTime();
    res.render("index.ejs", {
        // currentTime: currentTime,
        date: date
    })
});

// renders page to draft a new post
app.get("/compose", (req, res) => {
    res.render("compose.ejs")
});

// collects new posts and sends it to the homepage
app.post("/compose", (req, res) => {
    posts.push(req.body)
    res.render("index.ejs", {
        posts: posts
    })
});

// deletes a specific post
app.post("/delete", (req, res) => {
    let index = req.body["index"];
    posts.splice(index, 1); // Removing the post
    if (posts.length > 0) {
        res.render("index.ejs", {posts: posts});
    } else {
        res.redirect("/")
    }
    
});

// renders the page to edit post
app.post("/edit", (req, res) => {
    const index = req.body.index;
    const postToEdit = posts[index]
    res.render("edit.ejs", {
        post: postToEdit,
        index: index
    })
});


// save the edited post back to the list
app.post("/update", (req, res) => {
    const index = req.body.index;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    posts[index].title = updatedTitle
    posts[index].content = updatedContent

    res.render("index.ejs", {posts: posts})
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
