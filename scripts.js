// display comics, add next, previous, and random functionality

// nav buttons, random button, search button
    const prevButton = document.querySelector('#prev-btn');
    const nextButton = document.querySelector('#next-btn');
    const randomButton = document.querySelector('#random-btn');
    const searchButton = document.querySelector('#search-btn')
// select number dropdown
    const displayStrips = document.getElementById('numOfComics')
// select input text box for comic search
    const searchInput = document.getElementById('inputComicNum');
// select content
    const content = document.querySelector('.comic');
    const date = document.querySelector('.date');
    const title = document.querySelector('#titlecont');

// select loading spinner
    const loadingWheel = document.querySelector('#loadSpin');

// declare necessary variables
    let displayNum;
    let latestNum;
    let randomPageNum = 0;
    let stripNumbers = [];

    let nextTwo;
    let nextThree;
    let nextFour;
    let nextFive;

    let comicTwoUrl;
    let comicThreeUrl;
    let comicFourUrl;
    let comicFiveUrl;

// select outer containers per strip
    const one = document.querySelector('.one')
    const two = document.querySelector('.two')
    const three = document.querySelector('.three')
    const four = document.querySelector('.four')
    const five = document.querySelector('.five')

// Select containers for comics
    const comicOrig = document.querySelector('.comicO')
    const comicA = document.querySelector('.comicA')
    const comicB = document.querySelector('.comicB')
    const comicC = document.querySelector('.comicC')
    const comicD = document.querySelector('.comicD')

// Select containers for details
    const imgDetailsO = document.querySelector('.imgDetailsO')
    const imgDetailsA = document.querySelector('.imgDetailsA')
    const imgDetailsB = document.querySelector('.imgDetailsB')
    const imgDetailsC = document.querySelector('.imgDetailsC')
    const imgDetailsD = document.querySelector('.imgDetailsD')


// Get the number of the latest comic and total number of comics
    async function getLatest() {
        
        return fetch('https://xkcd.vercel.app/?comic=latest')
        .then(response => {
            if (response.ok) return response.json()
            throw new Error;
        })
        // Get number of the latest comic
        .then(res => {
            if(stripNumbers.length > 0){
                stripNumbers.splice(0, stripNumbers.length)
            }
            // sets display number to latest comic number
            displayNum = res.num;
            
            // Creates array of 1 to the latest comic strip number
            for (var i = 1; i <= displayNum; i++) {
                stripNumbers.push(i);
            }
            
            // sets to latest comic number
            latestNum = displayNum;

        })};
    
    // Set numbers for "random comic" button
    function randomNum(){
            randomPageNum = Math.ceil((Math.random() * stripNumbers.length) + 1);
    }

    // hide all divs in main except loader
    function clearAll(){
        document.querySelector('#searchError').classList.add('hidden')
        loadingWheel.classList.remove('hidden');
        console.log("clear")
        one.classList.add('hidden');
        four.classList.add('hidden');
        two.classList.add('hidden');
        three.classList.add('hidden');
        five.classList.add('hidden');
    }

    function getComics(url) {
        // hide comic divs and show loading spinner
        clearAll()
        loadingWheel.classList.remove('hidden')
 
        // FETCH CURRENT OR SEARCHED-FOR COMIC
        return fetch(url)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error;
        })
        .then(res => {
            latestNum = res.num;
            
            // if latestNum is the latest comic, set previous 2 and next two comics
            if(latestNum == stripNumbers.length){
                nextThree = stripNumbers[latestNum - 3];
                nextTwo = stripNumbers[latestNum - 2];
                nextFour = stripNumbers[0];
                nextFive = stripNumbers[1];
                console.log(stripNumbers)
            // if comic #1 is currently in the middie, set two latest comics and comics 2 and 3
            } else if(latestNum == stripNumbers.length-1){
                nextThree = stripNumbers[stripNumbers.length-4];
                nextTwo = stripNumbers[stripNumbers.length-3];
                nextFour = stripNumbers[latestNum];
                nextFive = stripNumbers[0];
                console.log(stripNumbers)
            } else if(latestNum == stripNumbers.length-2){
                nextThree = stripNumbers[stripNumbers.length-5];
                nextTwo = stripNumbers[stripNumbers.length-4];
                nextFour = stripNumbers[stripNumbers.length-2];
                nextFive = stripNumbers[latestNum+1];
                console.log(stripNumbers)
            } else if(latestNum == 1){
                nextThree = stripNumbers[stripNumbers.length-2];
                nextTwo = stripNumbers[stripNumbers.length-1];
                nextFour = stripNumbers[latestNum];
                nextFive = stripNumbers[latestNum+1];
                console.log(stripNumbers)
            } else if(latestNum == 2){
            // if comic #2 is currently in the middie, set latest comic, and comics 1, 2, 3, and 4
                nextThree = stripNumbers[stripNumbers.length-1];
                nextTwo = stripNumbers[0];
                nextFour = stripNumbers[latestNum];
                nextFive = stripNumbers[latestNum+1];
                console.log(stripNumbers)
            } else {
            // in every other case, set 2 preceding comics and 2 next comics
            nextThree = stripNumbers[latestNum - 3];
            nextTwo = stripNumbers[latestNum - 2];
            nextFour = stripNumbers[latestNum];
            nextFive = stripNumbers[latestNum+1];
            console.log(stripNumbers)
        }
        
        // CHECK
        console.log("3 comic:" + nextThree)
        console.log("2 comic:" + nextTwo)
        console.log("current comic:" + latestNum)
        console.log("4 comic:" + nextFour)
        console.log("5 comic:" + nextFive)
        
        // Set new URLs based on conditions above
        comicTwoUrl = `https://xkcd.vercel.app/?comic=${nextTwo}`;
        comicThreeUrl = `https://xkcd.vercel.app/?comic=${nextThree}`;
        comicFourUrl = `https://xkcd.vercel.app/?comic=${nextFour}`;
        comicFiveUrl = `https://xkcd.vercel.app/?comic=${nextFive}`;
        
        // remove hidden class and set innerHTML of middle div to show latest comic
        const image = `<img src="${res.img}" alt="${res.alt}"></img>`;
        const details = `
        <div class="date">#${res.num}</div>
        <div class="titlecont">${res.safe_title}</div>`
        imgDetailsO.innerHTML = details;
        loadingWheel.classList.add('hidden')
        one.classList.remove('hidden')
        comicOrig.innerHTML = image;
        
        // FETCH SECOND COMIC
        fetch(comicTwoUrl).then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
        })
        .then((resTwo => {
            console.log("second comic: " + resTwo.num)
            const details = `
            <div class="date">#${resTwo.num}</div>
            <div class="titlecont">${resTwo.safe_title}</div>`
            imgDetailsB.innerHTML = details;
            const image = `<img src="${resTwo.img}" alt="${resTwo.alt}"></img>`;
            comicB.innerHTML = image;
        }))
            
        // FETCH THIRD COMIC
        fetch(comicThreeUrl).then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then((resThree => {
            console.log("third comic: " + resThree.num)
            const details = `
            <div class="date">#${resThree.num}</div>
            <div class="titlecont">${resThree.safe_title}</div>`
            imgDetailsA.innerHTML = details;
            const image = `<img src="${resThree.img}" alt="${resThree.alt}"></img>`;
            comicA.innerHTML = image;
        }))
            
        // FETCH FOURTH COMIC
        fetch(comicFourUrl).then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then((resFour => {
            console.log("fouth comic: " + resFour.num)
            const details = `
            <div class="date">#${resFour.num}</div>
            <div class="titlecont">${resFour.safe_title}</div>`
            imgDetailsC.innerHTML = details;
            const image = `<img src="${resFour.img}" alt="${resFour.alt}"></img>`;
            comicC.innerHTML = image;
        }))
        
        // FETCH FIFTH COMIC
        fetch(comicFiveUrl).then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then((resFive => {
            console.log("fifth comic: " + resFive.num)
            const details = `
            <div class="date">#${resFive.num}</div>
            <div class="titlecont">${resFive.safe_title}</div>`
            imgDetailsD.innerHTML = details;
            const image = `<img src="${resFive.img}" alt="${resFive.alt}"></img>`;
            comicD.innerHTML = image;
        }))
    }
        )
}

function changeDisplay(num){
    const comicDivs = [one, four, two, three, five];
    
    let showArray = comicDivs.slice(0,num);
    let hideArray = comicDivs.slice(num, comicDivs.length);
    
    for(let showDiv of showArray){
        showDiv.classList.remove('hidden')
    }
    
    for(let hideDiv of hideArray){
        hideDiv.classList.add('hidden')
    }

    loadingWheel.classList.add('hidden');
}

// GET LATEST COMIC AND SHOW 1 COMIC BY DEFAULT
getLatest().then(() =>
    getComics('https://xkcd.vercel.app/?comic=latest')
).then(changeDisplay(displayStrips.value))


// show next comic
nextButton.addEventListener('click', () => {
    clearAll()
    getComics(`https://xkcd.vercel.app/?comic=${nextFour}`).then(
        changeDisplay(displayStrips.value)
)})

// show previous comic
prevButton.addEventListener('click', () => {
    // clearAll()
    getComics(`https://xkcd.vercel.app/?comic=${nextTwo}`).then(
        changeDisplay(displayStrips.value)
)})

// show random comic(s)
randomButton.addEventListener('click', () => {
    clearAll();
    randomNum();
    getComics(`https://xkcd.vercel.app/?comic=${randomPageNum}`).then(
        changeDisplay(displayStrips.value)
)})

// search a comic by number
searchButton.addEventListener('click', () => {
    document.querySelector('#searchError').classList.add('hidden')
    let searchComicNum = searchInput.value
    if(searchComicNum <= stripNumbers.length){
        getComics(`https://xkcd.vercel.app/?comic=${searchComicNum}`).then(
            changeDisplay(displayStrips.value))
    } else {
        // alert("Comic does not exist, please try a lower value")
        document.querySelector('#searchError').classList.remove('hidden')
    }
})


// show number of comics based on value of dropdown
displayStrips.addEventListener('change', () => {
    changeDisplay(displayStrips.value)
})