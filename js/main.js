// Sidebar Toggle

// Toggle
$('#toggleBtn').click(function(){
    if ( $('#sidebar').css('left') == '-250px'){
        $('#sidebar').animate({left:'0px'}, 500);
        $('#xBtn').css('display', 'block');
        $('#listBtn').css('display', 'none');
        slowMotion(navArray)
        console.log('Go')
    }
    else{
        $('#sidebar').animate({left:'-250px'}, 500);
        $('#xBtn').css('display', 'none');
        $('#listBtn').css('display', 'block');
        $('.navItem').animate({'top':'100vh','left':'-200px'}, 500)
        console.log('Back')
    }
    console.log($('#sidebar').css('left'))

})



// Slow Motion
let navItems = $('.navItem');
let navArray = Array.from(navItems)
console.log(navArray)
function slowMotion (items){
    let itemsArray = [...items];
    let animTime = 1000;
    for(i = 0 ; i < itemsArray.length ; i++){
        $(itemsArray[i]).animate({top:'0px', left:'0px'}, animTime);
        animTime+= 100;
    }
}

// API Fetch
let movieTitle, movieImg, movieOverview, movieRate, movieDate;
let moviesArray = []; 

// TrendingAPI
async function getTrending(){
    response = await fetch `https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2FCTpYW_vM-DFirH3VOpN4-_V4mzbZuBrJdEm_SuFxzQIuZ5TOz5LQWpc`
    result = await response.json();
    moviesArray.splice(0,moviesArray.length);
    moviesArray = [...result.results];
    console.log(result)
    console.log(moviesArray)
     showMovies(moviesArray)

}
getTrending();

// GeneralAPI
async function getGeneral(e){
    let response = await fetch ('https://api.themoviedb.org/3/movie/'+e+'?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    let result =  await response.json();
    moviesArray.splice(0,moviesArray.length);
    moviesArray = [...result.results];
    console.log(result)
    console.log(moviesArray)
    showMovies(moviesArray)
}

// Assigning Categroies
$('#topRated').click(function(){
    getGeneral('top_rated');
})
$('#nowPlaying').click(function(){
    getGeneral('now_playing');
})
$('#popular').click(function(){
    getGeneral('popular');
})
$('#trending').click(function(){
    getTrending();
})
$('#upcoming').click(function(){
    getGeneral('upcoming');
})

// Show Movies
function showMovies(showArray){
    let cartoona='';    
    for(let i =0 ; i < showArray.length; i++){   
        if(showArray[i].original_title == undefined){
            movieTitle = showArray[i].name;
        }
        else{
            movieTitle = showArray[i].original_title;
        }
        if(showArray[i].release_date == undefined){
            movieDate = showArray[i].first_air_date;
            console.log('No release date');
        }
        else{
            movieDate = showArray[i].release_date;
        }
        movieImg = showArray[i].poster_path;
        movieOverview = showArray[i].overview;
        movieRate = showArray[i].vote_average;

            cartoona+=`
        <div class="col-lg-4 col-md-6 my-2">
                    <div class="movieCard">
                        <div class="posterMovie position-relative overflow-hidden">
                            <img src='https://image.tmdb.org/t/p/w500/${movieImg}' class="imgPoster w-100" alt="">
                            <div class="movieDetailes d-flex justify-content-center align-items-center text-center overlay">
                                <div class="d-flex justify-content-center align-content-around flex-wrap p-md-3 p-sm-5">
                                    <h2 class="w-100 my-2">${movieTitle}</h2>
                                    <p class="w-100 my-2">${movieOverview}</p>
                                    <p class="w-100 my-2">rate: ${movieRate}</p>
                                    <p class="w-100 my-2">${movieDate}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
        `
    }
    document.getElementById('moviesInput').innerHTML = cartoona;
}

// Search

// Search AllMovies
let allMovies = document.getElementById('allMovies')
async function searchMovie(e){
    let response = await fetch("https://api.themoviedb.org/3/search/movie?query="+e+"&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false");
    let result =  await response.json();
    moviesArray.splice(0,moviesArray.length);
    moviesArray = [...result.results];
    showMovies(moviesArray);
}

// Search AllMovies Event
$('#allMovies').keyup(function(){
    let e = allMovies.value;
     if (e == '')
     {
         getTrending();   
      }
     else{
         searchMovie(e);
     }
     console.log(e);
 })

//  Search Word
let searchWord = document.getElementById('searchWord');
$('#searchWord').keyup(function (){
    let searchValue = searchWord.value;
    let foundArray = [];
    for (i=0;i<moviesArray.length;i++){
        if(moviesArray[i].original_title == undefined){
            movieTitle = moviesArray[i].name;
        }
        else{
            movieTitle = moviesArray[i].original_title;
        }

        if (movieTitle.toLowerCase().includes(searchValue.toLowerCase()) == true){
            foundArray.push(moviesArray[i])
        }
    }
    showMovies(foundArray);
})

// Regular Expressions
const regexName = /[A-Za-z\s]+/
const regexEmail = /^[\w-]+@[A-Za-z\s-]{2,10}[.][\w-]{2,10}$/
const regexPhone = /^01[0125][0-9]{8}$/
const regexAge = /^[1-9][0-9]{0,1}$/
const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

const nameInput = document.getElementById('nameInput')
const emailInput = document.getElementById('emailInput')
const phoneInput = document.getElementById('phoneInput')
const ageInput = document.getElementById('ageInput')
const passInput = document.getElementById('passInput')
const repassInput = document.getElementById('repassInput')

const nameAlert = document.getElementById('nameAlert')
const emailAlert = document.getElementById('emailAlert')
const phoneAlert = document.getElementById('phoneAlert')
const ageAlert = document.getElementById('ageAlert')
const passAlert = document.getElementById('passAlert')
const repassAlert = document.getElementById('repassAlert')


// Function MATCH
// jQuery.fn.extend({
//     matchRegex: function(inputItem, regexItem, alertItem){
//         if (inputItem.value.match(regexItem) == true){
//             $(alertItem).css('display', 'none');
//         }
//         else if(inputItem.value == ''){        
//             $(alertItem).css('display', 'block');
//         }
//         else{
//             $(alertItem).css('display', 'block');
//         }
//     }
// })
  
function matchRegex(input, regexItem, alertItem){
    if (input.value.match(regexItem)){
        $(alertItem).css('display', 'none');
        console.log('MATCH')
    }
    else if(input.value == ''){        
        $(alertItem).css('display', 'block');
        console.log('NO MATCH')
    }
    else{
        $(alertItem).css('display', 'block');
        console.log('NO MATCH')
    }
}

// Assigning Function MATCH
// Name
$(nameInput).keyup(function(){
    matchRegex(nameInput, regexName, nameAlert);
})

// Email
$(emailInput).keyup(function(){
    matchRegex(emailInput, regexEmail, emailAlert)
})

// Phone
$(phoneInput).keyup(() => matchRegex(phoneInput, regexPhone, phoneAlert))


// // Age
$(ageInput).keyup(function(){
    matchRegex(ageInput, regexAge, ageAlert)
})

// // Password
$(passInput).keyup(function(){
    matchRegex(passInput, regexPass, passAlert)
})

// // RepassWord Function
$(repassInput).keyup(function(){
    if(repassInput.value == passInput.value){
        $(repassAlert).css('display', 'none');
    }
    else if(repassInput.value == ''){        
        $(repassAlert).css('display', 'block');
    }
    else{
        $(repassAlert).css('display', 'block');
    }
    console.log('HHH')
    }
)

