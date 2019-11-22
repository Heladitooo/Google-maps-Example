
async function randomUser()
{
    var conductorName = document.getElementById('conductorName');
    var conductorImage = document.getElementById('conductorImage');

    const data = await fetch('https://uinames.com/api/?ext&region=colombia');
    const showData = await data.json();
    try{
        conductorName.innerHTML = `${showData.name} <br/> ${showData.phone}`;
        conductorImage.src = showData.photo;
    }catch(error)
    {
        return 'NONE!'
    }
}