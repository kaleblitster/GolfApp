let numblayers = 4;
let numholes = 18;
let allcourses;
let mycourse;
let mytee;

loadDoc();
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            allcourses = JSON.parse(this.responseText);
            for(let i = 0; i < allcourses.courses.length; i++){
                $('#mycourses').append(`<option value='${allcourses.courses[i].id}'>${allcourses.courses[i].name}</option>`)
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
  }

  function getcourse(theid) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            mycourse = JSON.parse(this.responseText);
            for(let i = 0; i < mycourse.data.holes[0].teeBoxes.length; i++){
                $('#mytees').append(`<option value='${i}'>${mycourse.data.holes[0].teeBoxes[i].teeType}</option>`)
            }
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${theid}`, true);
    xhttp.send();
  }

function setTee(teeid){
    mytee = teeid;
    //buildcol();
}

buildcol();
function buildcol() {
    for (let c = 1; c <= numholes; c++){
        $('.box').append(`<div id="col${c}" class="column">${c}</div>`)
    }
    //buildholes();
}

function buildholes() {
    for (let h = 1; h <= numholes; h++){
        $('#col' + h).append(`<div id="p${numblayers}h${h}" class="minibox"><input style="width: 24px; height: 24px;"></input></div>`);
    } 
    $('.minibox').keyup(function(){
        console.log($(this).attr('id'));
    });
}


function addplayer(){
    numblayers++;
    buildholes();
    $('.namelist').append(`<div class='namebox' contenteditable='true'><input placeholder='Player Name'></input></div>`)
}