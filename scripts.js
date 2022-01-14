// display comics, add next, previous, and random functionality

(function getComic(){
// nav buttons
    const prevButton = document.querySelector('#prev-btn');
    const nextButton = document.querySelector('#next-btn');
    const randomButton = document.querySelector('#random-btn');
// display number dropdown
    const displayStrips = document.getElementById('numOfComics')
// content
    const content = document.querySelector('.comic');
    const date = document.querySelector('.date');
    const title = document.querySelector('#titlecont');

    let prevPageNum = 0;
    let nextPageNum = 0;
    let randomPageNum = 0;
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const proxiedRequest = (url) =>
        fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then(res => {
            let displayNum = res.num;
            let next = res.num - 1;
            console.log(displayNum);
            console.log(next);

            const comicOrig = document.querySelector('.comicO')
            const comicA = document.querySelector('.comicA')

            const image = `<img src="${res.img}" alt="${res.alt}"></img>`;
            comicOrig.innerHTML = image;

            let newUrl = `https://xkcd.com/${next}/info.0.json`;

            fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(newUrl)}`).then(response => {
                if (response.ok) return response.json()
                throw new Error('Network response was not ok.')
            })
            .then((resTwo => {
                console.log("second comic: " + resTwo.num)

                const image = `<img src="${resTwo.img}" alt="${resTwo.alt}"></img>`;
                comicA.innerHTML = image;
            }))
         })

    //         const image = `<img src="${res.img}" alt="${res.alt}"></img>`;
    //         content.innerHTML = image;
    //         const imgDate = `<p>${months[res.month-1]} ${res.day} ${res.year}</p>`;
    //         date.innerHTML = imgDate;
    //         const imgTitle = `<p>${res.title}</p>`;
    //         title.innerHTML = imgTitle;
    //         console.log(imgTitle)

    //     // set values for next, previous, and random buttons
    //         setPageNumbers(res.num)
    //         randomPageNum = Math.floor((Math.random() * res.num) + 1);
    //     })
    //     .catch(error => console.error(`oh no --> `, error))


    // const setPageNumbers = (current) => {
    //     console.log(current, typeof current)
    //     prevPageNum = current-1
    //     nextPageNum = current+1
    // }

    const proxiedGet = url => proxiedRequest(url)

    proxiedGet('https://xkcd.com/info.0.json')

    // function prevComic(){
    //     // console.log(prevPageNum)
    //     proxiedGet(`https://xkcd.com/${prevPageNum}/info.0.json`)
    // }

    // function nextComic(){
    //     // console.log(nextPageNum)
    //     proxiedGet(`https://xkcd.com/${nextPageNum}/info.0.json`)
    // }

    // function randomComic(){
    //     // console.log(randomPageNum)
    //     proxiedGet(`https://xkcd.com/${randomPageNum}/info.0.json`)
    // }

    // prevButton.addEventListener('click', prevComic)
    // nextButton.addEventListener('click', nextComic)
    // randomButton.addEventListener('click', randomComic)

    // displayStrips.addEventListener('change', () => proxiedGet('https://xkcd.com/info.0.json'))

})()