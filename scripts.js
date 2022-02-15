// display comics, add next, previous, and random functionality

// (function getComic(){
// nav buttons, random button, search button
    const prevButton = document.querySelector('#prev-btn');
    const nextButton = document.querySelector('#next-btn');
    const randomButton = document.querySelector('#random-btn');
    const searchButton = document.querySelector('#search-btn')
// select number dropdown
    const displayStrips = document.getElementById('numOfComics')
// input text box for comic search
    const searchInput = document.getElementById('inputComicNum');
// content
    const content = document.querySelector('.comic');
    const date = document.querySelector('.date');
    const title = document.querySelector('#titlecont');

// loading button
    const loadingWheel = document.querySelector('#loadSpin');

// select outer containers per strip
    const one = document.querySelector('.one')
    const two = document.querySelector('.two')
    const three = document.querySelector('.three')
    const four = document.querySelector('.four')
    const five = document.querySelector('.five')

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

// SELECT CONTAINERS FOR COMICS
    const comicOrig = document.querySelector('.comicO')
    const comicA = document.querySelector('.comicA')
    const comicB = document.querySelector('.comicB')
    const comicC = document.querySelector('.comicC')
    const comicD = document.querySelector('.comicD')

    // Get the number of the latest comic and total number of comics
    function getLatest() {
        
        // fetch(`https://api.allorigins.win/raw?url=https://xkcd.com/info.0.json`)
        fetch('https://xkcd.vercel.app/?comic=latest')
        .then(response => {
            if (response.ok) return response.json()
            throw new Error;
        })
        // FETCH FIRST COMIC
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
            // console.log("stripnums is " + stripNumbers)
        })};

    getLatest();

    const proxiedRequest = (url) => {
        // hide comic div to show loading spinner
        comicOrig.classList.add('hidden')
        loadingWheel.classList.remove('hidden')
        // fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
        fetch(url)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error;
        })
        // FETCH CURRENT OR SEARCHED-FOR COMIC
        .then(res => {
            // run getLatest to get array of all comics + number of the latest comic
            getLatest();
            // set to latest comic number, based on response of fetch 
            latestNum = res.num;
            // console.log("latestNum is " + latestNum)
            // remove hidden class and set innerHTML of middle div to show latest comic
            const image = `<img src="${res.img}" alt="${res.alt}"></img>`;
            comicOrig.classList.remove('hidden')
            loadingWheel.classList.add('hidden')
            comicOrig.innerHTML = image;

            // if latestNum is the latest comic, set previous 2 and next two comics
            if(latestNum == stripNumbers.length){
                nextThree = stripNumbers[latestNum - 3];
                nextTwo = stripNumbers[latestNum - 2];
                nextFour = stripNumbers[0];
                nextFive = stripNumbers[1];
                console.log(stripNumbers)
            // if comic #1 is currently in the middie, set two latest comics and comics 2 and 3
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
            }
            else{
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

            // SET NEW URLS BASED ON CONDITIONS ABOVE
            comicTwoUrl = `https://xkcd.vercel.app/?comic=${nextTwo}`;
            comicThreeUrl = `https://xkcd.vercel.app/?comic=${nextThree}`;
            comicFourUrl = `https://xkcd.vercel.app/?comic=${nextFour}`;
            comicFiveUrl = `https://xkcd.vercel.app/?comic=${nextFive}`;
            
            // SET NUMBERS FOR RANDOM COMIC BUTTON
            randomPageNum = Math.floor((Math.random() * stripNumbers.length) + 1);
        }
            )
    }

    // GET LATEST COMIC
    proxiedRequest('https://xkcd.vercel.app/?comic=latest')


    // MAKE REQUEST TO FETCH & SHOW 5 COMICS
    function displayFive(){
        console.log("show 5")
                       // FETCH SECOND COMIC
                       fetch(comicTwoUrl).then(response => {
                        if (response.ok) return response.json()
                        throw new Error('Network response was not ok.')
                    })
                    .then((resTwo => {
                        console.log("second comic: " + resTwo.num)
                        const image = `<img src="${resTwo.img}" alt="${resTwo.alt}"></img>`;
                        comicA.innerHTML = image;
                    }))
        
        // FETCH THIRD COMIC
                    fetch(comicThreeUrl).then(response => {
                        if (response.ok) return response.json()
                        throw new Error('Network response was not ok.')
                    })
                    .then((resThree => {
                        console.log("third comic: " + resThree.num)
        
                        const image = `<img src="${resThree.img}" alt="${resThree.alt}"></img>`;
                        comicB.innerHTML = image;
                    }))
        
        // FETCH FOURTH COMIC
                    fetch(comicFourUrl).then(response => {
                        if (response.ok) return response.json()
                        throw new Error('Network response was not ok.')
                    })
                    .then((resFour => {
                        console.log("fouth comic: " + resFour.num)
        
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
        
                        const image = `<img src="${resFive.img}" alt="${resFive.alt}"></img>`;
                        comicD.innerHTML = image;
                    }))
    }

    // MAKE REQUEST TO FETCH & SHOW 3 COMICS
    function displayThree(){
        console.log("show 3")
        // FETCH SECOND COMIC
        fetch(comicTwoUrl).then(response => {
         if (response.ok) return response.json()
         throw new Error('Network response was not ok.')
        })
        .then((resTwo => {
            console.log("second comic: " + resTwo.num)
            const image = `<img src="${resTwo.img}" alt="${resTwo.alt}"></img>`;
            comicA.innerHTML = image;
        }))

        // FETCH FOURTH COMIC
        fetch(comicFourUrl).then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then((resFour => {
            console.log("fouth comic: " + resFour.num)

            const image = `<img src="${resFour.img}" alt="${resFour.alt}"></img>`;
            comicC.innerHTML = image;
        }))
}

    function randomComic(){
        proxiedRequest(`https://xkcd.vercel.app/?comic=${randomPageNum}`)
        if(displayStrips.value == 3){
            displayThree();
        } else if(displayStrips.value == 5){
            displayFive();
        }
    }

    function searchComic(){
        let searchComicNum = searchInput.value
        if(searchComicNum <= latestNum){
            proxiedRequest(`https://xkcd.vercel.app/?comic=${searchComicNum}`)
            if(displayStrips.value == 3){
                displayThree();
            } else if(displayStrips.value == 5){
                displayFive();
            }
        }else{
            console.log("No comic found")
        }
    }

    // SET PREVIOUS AND NEXT BUTTONS
    nextButton.addEventListener('click', () => {
        proxiedRequest(`https://xkcd.vercel.app/?comic=${nextFour}`);
        if(displayStrips.value == 3){
            displayThree();
        } else if(displayStrips.value == 5){
            displayFive();
        }
    })
        
    prevButton.addEventListener('click', () => {
        proxiedRequest(`https://xkcd.vercel.app/?comic=${nextTwo}`);
        if(displayStrips.value == 3){
            displayThree();
        } else if(displayStrips.value == 5){
            displayFive();
        }
    })

    randomButton.addEventListener('click', randomComic);
    searchButton.addEventListener('click', searchComic);

// DROP DOWN FUNCTIONALITY
    displayStrips.addEventListener('change', () => {
        if(displayStrips.value == 3){
            displayThree();
            two.classList.remove("hidden");
            four.classList.remove("hidden");
        } else if(displayStrips.value == 5){
            displayFive();
            two.classList.remove("hidden");
            three.classList.remove("hidden");
            four.classList.remove("hidden");
            five.classList.remove("hidden");
        } else {
            two.classList.add("hidden");
            three.classList.add("hidden");
            four.classList.add("hidden");
            five.classList.add("hidden");
        }
    })

// })()