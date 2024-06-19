
let opt = 'daily';
let data;

fetchAndRenderBlocks ();

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
    document.querySelector ('.cmp').innerHTML += data.map (obj => 
        `
        <div class="cmp__block cmp__block-${obj.title}">
            <div class="cmp__block__inner">
                <div class="cmp__header">
                    <h3 class="cmp__title">${obj.title}</h3>
                    <img src="./images/icon-ellipsis.svg" alt="Ellipsis" class="cmp__ellipsis"/>
                </div>
                <div class ="cmp__main">
                    <h2 class="cmp__time">${obj.timeframes[opt].current}hrs</h2>
                    <p class="cmp__time-prev">${opt === 'daily' ? 'Yesterday' : opt === 'weekly' ? 'Last Week' : 'Last Month'} - ${obj.timeframes[opt].previous}hrs</p>
                </div>
            </div>
        </div>
        `
    )
}


