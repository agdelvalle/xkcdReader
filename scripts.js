// display comics, add next, previous, and random functionality

(function getComic(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com';
    // const proxyUrl = 'https://cors.bridged.cc';
// nav buttons
    const prevButton = document.querySelector('#prev-btn');
    const nextButton = document.querySelector('#next-btn');
    const randomButton = document.querySelector('#random-btn');
// content
    const content = document.querySelector('.comic');
    const date = document.querySelector('.date');
    const title = document.querySelector('#titlecont');

    let prevPageNum = 0;
    let nextPageNum = 0;
    let randomPageNum = 0;
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const proxiedRequest = (url) =>
        fetch(`${proxyUrl}/${url}`, {
        headers: {
            'X-Requested-With': 'wololo',
        },
        })
        .then(resp => resp.json())
        .then(res => {
        // display comic and details
            const image = `<img src="${res.img}" alt="${res.alt}"></img>`;
            content.innerHTML = image;
            const imgDate = `<p>${months[res.month-1]} ${res.day} ${res.year}</p>`;
            date.innerHTML = imgDate;
            const imgTitle = `<p>${res.title}</p>`;
            title.innerHTML = imgTitle;
            console.log(imgTitle)

        // set values for next, previous, and random buttons
            console.log(res.num, typeof res.num)
            prevPageNum = res.num-1
            nextPageNum = res.num+1
            randomPageNum = Math.floor((Math.random() * res.num) + 1);
        }
            )
        .catch(error => console.error(`oh no --> `, error))

    const proxiedGet = url => proxiedRequest(url)

    proxiedGet('https://xkcd.com/info.0.json')

    function prevComic(){
        // console.log(prevPageNum)
        proxiedGet(`https://xkcd.com/${prevPageNum}/info.0.json`)
    }

    function nextComic(){
        // console.log(nextPageNum)
        proxiedGet(`https://xkcd.com/${nextPageNum}/info.0.json`)
    }

    function randomComic(){
        // console.log(randomPageNum)
        proxiedGet(`https://xkcd.com/${randomPageNum}/info.0.json`)
    }

    prevButton.addEventListener('click', prevComic)
    nextButton.addEventListener('click', nextComic)
    randomButton.addEventListener('click', randomComic)

})()