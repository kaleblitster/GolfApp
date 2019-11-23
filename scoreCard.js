let numbplayers = 4;
let numholes = 18;
let allcourses;
let mycourse=localStorage.getItem("courseid");
let mytee=0;
let teetypesloaded=0;
let teetypes = 4;
let totalYards=0;
let totalPar = 0;
let inYardage = 0;
let inPar = 0;
let course;
let name;
let playercounter=0;
//

loadDoc();
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

            allcourses = JSON.parse(this.responseText);
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
    let totalYards=0;
    let totalPar = 0;
    let inYardage = 0;
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
            course = JSON.parse(this.responseText);
            $('#box').append(`<tr id='yards'><td>Yardage:</td></tr>`);
            $('#box').append(`<tr id='par'><td>Par:</td></tr>`);
            $('#box').append(`<tr id='hcp'><td>Handicap:</td></tr>`);
            for (i = 0; i < 21; i++){
                if (i < 9) {
                    $('#yards').append(`<td id="yards${i+1}">${course.data.holes[i].teeBoxes[mytee].yards}</td>`);
                    totalYards+=parseInt(course.data.holes[i].teeBoxes[mytee].yards);
                    $('#par').append(`<td id="pars${i+1}">${course.data.holes[i].teeBoxes[mytee].par}</td>`);
                    totalPar+=parseInt(course.data.holes[i].teeBoxes[mytee].par);
                    $('#hcp').append(`<td id="handicap${i+1}">${course.data.holes[i].teeBoxes[mytee].hcp}</td>`);
                }
                if (i == 9){
                    $('#yards').append(`<td id="yardsOut">${totalYards}</td>`);
                    totalYards+=parseInt(course.data.holes[i].teeBoxes[mytee].yards);
                    $('#par').append(`<td id="parsOut">${totalPar}</td>`);
                    totalPar+=parseInt(course.data.holes[i].teeBoxes[mytee].par);
                    $('#hcp').append(`<td id="handicapOut"></td>`);

                }
                if (i > 8 && i < 18){
                    $('#yards').append(`<td id="yards${i+1}">${course.data.holes[i].teeBoxes[mytee].yards}</td>`);

                        totalYards+=parseInt(course.data.holes[i].teeBoxes[mytee].yards);
                        inYardage+=parseInt(course.data.holes[i].teeBoxes[mytee].yards);


                    $('#par').append(`<td id="pars${i+1}">${course.data.holes[i].teeBoxes[mytee].par}</td>`);
                    
                        totalPar += parseInt(course.data.holes[i].teeBoxes[mytee].par);
                        inPar+=parseInt(course.data.holes[i].teeBoxes[mytee].par);


                    $('#hcp').append(`<td id="handicap${i+1}">${course.data.holes[i].teeBoxes[mytee].hcp}</td>`);

                }
                if (i == 18){
                    $('#yards').append(`<td id="yardsIn">${inYardage}</td>`);
                    $('#par').append(`<td id="parsIn">${inPar}</td>`);
                    $('#hcp').append(`<td id="handicapIn"></td>`);

                }
                if (i == 19){
                    $('#yards').append(`<td id="yardsTotal">${totalYards}</td>`);
                    $('#par').append(`<td id="parsTotal">${totalPar}</td>`);
                    $('#hcp').append(`<td id="handicapTotal"></td>`);
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
                $('#par' + i).html(allcourses.data.holes[i].teeBoxes[mytee].par);
                $('#hcp' + i).html(allcourses.data.holes[i].teeBoxes[mytee].hcp);
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
    $('#box').append(`<tr id="playerRow${playercounter}"></tr>`);

    $("#playerRow"+playercounter).append(`<td class='namebox' contenteditable='true' >${name}</td>`);
    for (let h = 0; h < 23; h++){
       if(h<9)
        $('#playerRow'+playercounter).append(`<td class="minibox">
        <input id="${name}${h+1}"  type="text" onkeypress="isInputNumber(event)" style="width: 25px; height: 25px"></td>`);
        if(h>9 && h<19)
            $('#playerRow'+playercounter).append(`<td   class="minibox">
        <input id="${name}${h}" type="text" onkeypress="isInputNumber(event)" style="width: 25px; height: 25px"></td>`);

        if (h == 9){
            $('#playerRow'+playercounter).append(`<td id="${name}out" class="minibox"><output></output></td>`);
        }
        if (h == 18){
            $('#playerRow'+playercounter).append(`<td id="${name}${h}" class="minibox"><output></output></td>`);
        }
        if (h >18){
            $('#playerRow'+playercounter).append(`<td id="${name}${h}" class="minibox"><output></output></td>`);
            playercounter++;
            break;
        }
    } 
    $('.minibox').keyup(function(){
        console.log($(this).attr('id'));
    });
}

function isInputNumber(evt) { //this function only allows players to input a number value for a score.
    var ch = String.fromCharCode(evt.which);

    if (!(/[0-9]/.test(ch))){
        evt.preventDefault();
        alert('Please enter a number value');
    }
}

// function calc() {
//     let a = document.getElementById("box${i+1}").value;
//     let b = document.getElementById("box${i+1}").value;
//     let res = document.getElementById("resultbox");
//
//     let answer = Number(a) + Number(b);
//     res.innerHTML = answer;
// }

function addplayer(event){
    if(event.which==13){
        console.log(event);
        if (playercounter !=numbplayers) {
            name = $('#addplayerbutton').val();
            buildholes();
            $('#addplayerbutton').val('');
        }
        else alert("sorry only four players allowed per sheet.")
    }
}

//
// class Player{
//     constructor(name){
//         this.name=name;
//         this.id=playerCount;
//         playerCount++;
//         players.push(this)
//     }
// }


function loadCourse() {
    mycourse = localStorage.getItem('courseid');
}
