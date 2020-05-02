

let schedule = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
}
let tempStr = localStorage.getItem("schedule");
if(tempStr != undefined) {
    schedule = JSON.parse(tempStr);
}
const renderDate = function() {
    let date = moment().format("dddd, MMMM Do");
    $("#currentDay").text(date);
}


const renderTable = function () {
    let currentHour = moment().hour();
    for (let i = 9; i < 18; i++) {
        let newBlock = $("<div>").attr("class", "row")
        if (i < 12) {
            newBlock.append($("<div>").attr("class", "col hour").text(`${i}AM`));
        } else if (i === 12) {
            newBlock.append($("<div>").attr("class", "col hour").text(`${i}PM`));
        } else {
            newBlock.append($("<div>").attr("class", "col hour").text(`${i - 12}PM`));
        }
        let blockDesc = $("<textarea>").attr("id", `desc${i}`);
        if (currentHour > i) {
            blockDesc.attr("class", "col-10 description past");
        } else if (currentHour === i) {
            blockDesc.attr("class", "col-10 description present");
        } else {
            blockDesc.attr("class", "col-10 description future");
        }
        blockDesc.text(schedule[i]);
        newBlock.append(blockDesc);
        newBlock.append($("<button>").attr("class", "col saveBtn").attr("data-time", i).append($("<img>").attr("src", "assets/saveBtn.png")));
        $(".time-block").append($(newBlock))
    }
}

const clickHandler = function(e) {
    e.preventDefault();
    let time = this.dataset.time;
    schedule[time] = $(`#desc${time}`).val();
    localStorage.setItem("schedule", JSON.stringify(schedule));
}


// Checks to see if the date or hour has changed once a minute.
const updatePage = function() {
    renderDate();
    let currentHour = moment().hour();
    for(let i = 9; i < 18; i++) {
        let blockDesc = $(`#desc${i}`);
        if (currentHour > i) {
            blockDesc.attr("class", "col-10 description past");
        } else if (currentHour === i) {
            blockDesc.attr("class", "col-10 description present");
        } else {
            blockDesc.attr("class", "col-10 description future");
        }
    }
}

renderDate();
renderTable();
$(".saveBtn").on("click", clickHandler);
setInterval(updatePage, 10000);