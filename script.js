

let mycourses;
let myclasses;

(function () {
    getCourses();
})();

function getCourses() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){ //4 means it is looking for it. 200 means that it found it
            mycourses = JSON.parse(this.responseText);
            console.log(mycourses);
            for (let i = 0; i < mycourses.courses.length; i++){
                $('.container').append(`<div class="courseBox">
                <img width="300" src="${mycourses.courses[i].image}">
                <div>${mycourses.courses[i].name}</div>
                <a href = 'scorecard.html'> <button onclick="getclass(${mycourses.courses[i].catid}, this)">Select This Course</button></a>
                <div class="levels"></div>    
                </div>`);
            }
        }
    };
    xhttp.open('GET', 'https://golf-courses-api.herokuapp.com/courses', true);
    xhttp.send();
}

function getclass(cid, el) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){ //4 means it is looking for it. 200 means that it found it
            myclasses = JSON.parse(this.responseText);
            console.log(myclasses);

            console.log($(el).parent().find('.levels'));

            for (let l = 0; l < myclasses[0].levels.length; l++){
                console.log(myclasses.classes[0].levels[l].type);
                $(el).parent().find('.levels').append(`<div onclick="showclass(${l})">
                                    <span>${myclasses.classes[0].levels[l].type}</span>
                                    </div>`);
            }
        }
    };

    xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/:id`, true);
    xhttp.send();
}
function showclass(ctype) {
    for (let c = 0; c < myclasses.classes.length; c++){
        $('.classlist').append(`<div><span>${myclasses.classes[c].levels[ctype].teacher}</span>
                                <span>${myclasses.classes[c].levels[ctype].schedule}</span>
                                </div>`)
    }
}




