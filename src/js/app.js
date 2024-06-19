const btnDaily = document.querySelector ('.cmp__btn-daily');
const btnWeekly = document.querySelector ('.cmp__btn-weekly');
const btnMonthly = document.querySelector ('.cmp__btn-monthly');

    btnDaily.addEventListener ('click', () => setOpt ('daily'));
    btnWeekly.addEventListener ('click', () => setOpt ('weekly'));
    btnMonthly.addEventListener ('click', () => setOpt ('monthly'));


const grid = document.querySelector ('.cmp__grid');
let opt = 'daily';
let data;

fetchAndRenderBlocks ();


function setOpt (value)
{
    opt = value;
    render ();
}

async function fetchAndRenderBlocks () 
{
    const res = await fetch ('./data.json');

    if (!res.ok)
        throw new Error ((await res.json().message) || res.statusText);

    data = await res.json ();
    
    render ();
}


function render ()
{
    grid.innerHTML = data.map (obj => 
        `
        <div class="cmp__block cmp__block-${obj.title.replace (' ', '-')}">
            <div class="cmp__block__inner">
                <div class="cmp__block__header">
                    <h3 class="cmp__block__title">${obj.title}</h3>
                    <img src="./images/icon-ellipsis.svg" alt="Ellipsis" class="cmp__block__ellipsis"/>
                </div>
                <div class ="cmp__block__main">
                    <h2 class="cmp__block__time">${obj.timeframes[opt].current}hrs</h2>
                    <p class="cmp__block__time-prev">${opt === 'daily' ? 'Yesterday' : opt === 'weekly' ? 'Last Week' : 'Last Month'} - ${obj.timeframes[opt].previous}hrs</p>
                </div>
            </div>
        </div>
        `
    ).join ('');

    btnDaily.classList.remove ('active');
    btnWeekly.classList.remove ('active');
    btnMonthly.classList.remove ('active');
    
    if (opt === 'daily')
        btnDaily.classList.add ('active');
    else if (opt === 'weekly')
        btnWeekly.classList.add ('active');
    if (opt === 'monthly')
        btnMonthly.classList.add ('active');
}


