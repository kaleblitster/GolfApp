let numblayers = 4;
let numholes = 18;
let allcourses;
let mycourse=localStorage.getItem("courseid");
let mytee;
let teetypesloaded=0;
let teetypes = 4;

//

loadDoc();
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            allcourses = JSON.parse(this.responseText);
            console.log(allcourses.courses[1].name);
            for(let i = 0; i < allcourses.courses.length; i++){
                if(allcourses.courses[i].id==mycourse){
                    $('#mycourses').html(allcourses.courses[i].name);
                }
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
            if(teetypesloaded==0) {
                for (let i = 0; i < teetypes; i++) {
                    $('#mytees').append(`<option value='${i}'>${mycourse.data.holes[0].teeBoxes[i].teeType}</option>`)
                }
            }
          if (teetypesloaded==0){teetypesloaded=1;}// made it so the tee types can only equal 4 types. This prevents repeating tee types when changing courses.
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
        $('.box').append(`<div id="col${c}" class="column">${c}</div>`);
        if(c === 9){
            $('.box').append(`<div id="nineHoleScore" class="column">Out</div>`);
        }
        if(c === 18){
            $('.box').append(`<div id="backNineScore" class="column">In</div>`);
        }
        if(c === 18){
            $('.box').append(`<div id="totalScore" class="column">Total</div>`);
        }
    }
    //buildholes();
}

function buildholes() {
    for (let h = 1; h <= numholes; h++){
        $('#col' + h).append(`<div id="p${numblayers}h${h}" class="minibox" style="margin-bottom: 3px"><input style="width: 24px; height: 24px; "></div>`);
        if(h === 9){
            $('#nineHoleScore').append(`<div id="p${numblayers}h${h}" class="minibox" style="width: 60px; height: 30px"></div>`);
        }
        if(h === 18){
            $('#backNineScore').append(`<div id="p${numblayers}h${h}" class="minibox" style="width: 60px; height: 30px"></div>`);
        }
        if(h === 18){
            $('#totalScore').append(`<div id="p${numblayers}h${h}" class="minibox" style="width: 60px; height: 30px"></div>`);
        }
    } 
    $('.minibox').keyup(function(){
        console.log($(this).attr('id'));
    });
}


function addplayer(){
    numblayers++;
    buildholes();
    $('.namelist').append(`<div class='namebox' contenteditable='true'><input placeholder='Player Name'></div>`)
}

function loadCourse() {
    mycourse = localStorage.getItem('courseid');
    addplayer();
}
