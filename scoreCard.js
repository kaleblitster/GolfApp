let numblayers = 4;
let numholes = 18;
let allcourses;
let mycourse=localStorage.getItem("courseid");
let mytee=0;
let teetypesloaded=0;
let teetypes = 4;
let course;

//

loadDoc();
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

            allcourses = JSON.parse(this.responseText);
            console.log('#holes');
            for(let i = 0; i < allcourses.courses.length; i++){
                if(allcourses.courses[i].id==mycourse){
                    $('#mycourses').html(allcourses.courses[i].name);
                }
            }
            //the 20 in the for loop is to make 21 columns. 18 holes, and 3 extra boxes (in, out, total).
            for (i = 0; i < 20; i++){
                if (i < 8){}
            }

        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
  }
  getcourse(mycourse);
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

buildcol();
function buildcol() {
    $('#box').html(`<tr id='holes'></tr>`);
    $('#holes').append(`<td  class="column">Holes:</td>`);
    for (let c = 1; c <= numholes; c++){
        $('#holes').append(`<td id="col${c}" class="column">${c}</td>`);
        if(c === 9){
            $('#holes').append(`<td id="nineHoleScore" class="column" style="width: 60px; height: 30px">Out</td>`);
        }
        if(c === 18){
            $('#holes').append(`<td id="backNineScore" class="column" style="width: 60px; height: 30px">In</td>`);
            $('#holes').append(`<td id="totalScore" class="column" style="width: 60px; height: 30px">Total</td>`);
        }
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#box').append(`<tr id='yards'><td>Yardage:</td></tr>`);
            $('#box').append(`<tr id='par'><td>Par:</td></tr>`);
            $('#box').append(`<tr id='hcp'><td>Handicap:</td></tr>`);
            course = JSON.parse(this.responseText);
            for (i = 0; i < 21; i++){
                if (i < 9) {
                    $('#yards').append(`<td id="yards${i+1}">${course.data.holes[i].teeBoxes[mytee].yards}</td>`);
                    $('#par').append(`<td id="pars"+(i+1)>${course.data.holes[i].teeBoxes[mytee].par}</td>`)
                    $('#hcp').append(`<td id="handicap${i+1}">${course.data.holes[i].teeBoxes[mytee].hcp}</td>`);
                }
                if (i == 9){
                    $('#yards').append(`<td id="yardsIn"></td>`);
                    $('#par').append(`<td id="parsIn"></td>`);
                    $('#hcp').append(`<td id="handicapIn"></td>`);

                }
                if (i > 8 && i < 18){
                    $('#yards').append(`<td id="yards${i+1}">${course.data.holes[i].teeBoxes[mytee].yards}</td>`);
                    $('#par').append(`<td id="pars"+(i+1)>${course.data.holes[i].teeBoxes[mytee].par}</td>`)
                    $('#hcp').append(`<td id="handicap${i+1}">${course.data.holes[i].teeBoxes[mytee].hcp}</td>`);

                }
                if (i == 18 || i == 19){
                    $('#yards').append(`<td id="yardsOut"></td>`);
                    $('#par').append(`<td id="pars"></td>`);
                    $('#hcp').append(`<td id="handicap"></td>`);

                }
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + mycourse, true);
    xhttp.send();
}



function pageUpdater() {
    mycourse=localStorage.getItem("courseid");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            allcourses = JSON.parse(this.responseText);
            for (i = 0; i < 18; i++){
                $('#yards' + i).html(allcourses.data.holes[i].teeBoxes[mytee].yards);
            }
        }
    };
    console.log(mycourse);
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + mycourse, true);
    xhttp.send();
}
function setTee(teeid){
    mytee = teeid;
    pageUpdater();
}


//totally playa related below
function buildholes() {
    $('#box').append(`<tr id="playerRow"></tr>`);

    $("#playerRow").append(`<td class='namebox' contenteditable='true' ><input placeholder='Player Name'></td>`)
    for (let h = 1; h <= 21; h++){
        $('#playerRow').append(`<td id="p${numblayers}h${h}" class="minibox" style="margin-bottom: 3px"><input style="width: 24px; height: 24px; "></td>`);
        /*if(h === 9){
            $('#nineHoleScore').append(`<td id="p${numblayers}h${h}" class="minibox" style="width: 60px; height: 30px"></td>`);
        }
        if(h === 18){
            $('#backNineScore').append(`<td id="p${numblayers}h${h}" class="minibox" style="width: 60px; height: 30px"></td>`);

            $('#totalScore').append(`<td id="p${numblayers}h${h}" class="minibox" style="width: 60px; height: 30px"></td>`);
        }*/
    } 
    $('.minibox').keyup(function(){
        console.log($(this).attr('id'));
    });
}


function addplayer(){
    numblayers++;
    buildholes();
}

function loadCourse() {
    mycourse = localStorage.getItem('courseid');
    //addplayer();
}
