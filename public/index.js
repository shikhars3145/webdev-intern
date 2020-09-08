const form = document.querySelector('form');
console.log(form)
form.addEventListener('submit',async (e)=>{
    console.log('submited')
    e.preventDefault();
    const lat = document.querySelector('#lat').value;
    const long = document.querySelector('#long').value;
    const radius = document.querySelector('#radius').value;
    
    const res = await axios.post('/api/partners', {lat,long,radius});
    console.log(res.data)
    const results = document.querySelector('.results');
    if(!res.data.data.length)
    results.innerHTML = `<h1> No results </h1>`;
    else{
        // console.log('else runnig');
        // results.innerHTML = 'res';
        let HTML = 'results';

        res.data.data.forEach(partner=>{
            console.log(partner.organization)
            const tag = document.createElement("li");
            const text = document.createTextNode(partner.organization);
            tag.appendChild(text);
            results.appendChild(tag)
            HTML.concat(`<li>${partner.organization}</li>`);
            partner.offices.forEach(office=> {if(office.inRadius) {
                console.log(office.address)
                const tag = document.createElement("li");
            const text = document.createTextNode(office.address);
            tag.appendChild(text);
            results.appendChild(tag)
                HTML.concat(`<li>${office.address}</li>`);}})
        });
        
    }



})
