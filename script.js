
var icon = document.getElementById('icon-small')

var container = document.querySelector('.container')
var seats = document.querySelectorAll('.row .seat:not(.occupied)')

var count = document.getElementById('count')
var total = document.getElementById('total')
var movieSelect = document.getElementById('movie')

populateUI()

var ticketPrice = +movieSelect.value 

icon.onclick = function(){
    document.body.classList.toggle('light-theme')

    if(document.body.classList.contains('light-theme')){
        icon.name = "moon-outline"
    }else{
        icon.name = "sunny-outline"
    }
    localStorage.setItem('mode',document.body.classList)
    localStorage.setItem('iconName',icon.name)
}


// Save selected movie index and price

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}


// Update total and count

function updateSelectedCount(){
    var selectedSeats = document.querySelectorAll('.row .seat.selected')

    var seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat)
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    var selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

// Get data from local storage and populateUI

function populateUI(){
    var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    var selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }

    var selectedMovieImage = localStorage.getItem('selectedMovieImage')

    if(selectedMovieImage !== null){
        document.querySelector('.posters').style.backgroundImage = selectedMovieImage
    }

    var mode = localStorage.getItem('mode')
    var iconName = localStorage.getItem('iconName')
    
    if(mode !== null){
    document.body.classList = mode
    }   
    icon.name = iconName 
    
}

// Set Background Image
function setBackground(){
    localStorage.setItem('selectedMovieImage',document.querySelector('.posters').style.backgroundImage)
}

// Movie select change event

movieSelect.addEventListener('change',function(e){
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
    if(e.target.value == 12){
        document.querySelector('.posters').style.backgroundImage = "url('img/joker.jpg')"
    }else if(e.target.value == 10){
        document.querySelector('.posters').style.backgroundImage = "url('img/avengers.jpg')"
    }else if(e.target.value == 9){
        document.querySelector('.posters').style.backgroundImage = "url('img/toy-story.jpg')"
    }else if(e.target.value == 11){
        document.querySelector('.posters').style.backgroundImage = "url('img/lion-king.jpg')"
    }
    setBackground()
})



container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount()
    }
})

updateSelectedCount()


 







