//Loads Image from API : 'https://www.fishwatch.gov/api/species'

function LoadImg() {
    fetch('https://www.fishwatch.gov/api/species')
        .then(response => response.json())
        .then(data => DisplayImg(data));
}

//Run function to manipulate data
function DisplayImg(data) {
    const fish_display = document.getElementById('fish-img');

    // Calling New post function
    const form = document.getElementById('fish-review');
    form.addEventListener('submit', (e) => { newPost(e) })

    //Iterate # of Fish in API
    for (let i = 40; i < 50; i++) {

        // Create elements 
        const fishes_div = document.createElement('div');
        const fishes_img = document.createElement('img');
        const label = document.createElement('label');
        const Description = document.createElement('label');

        //elements for like-button
        const like_btn = document.createElement('button');

        // Check if species photo exist
        if (data[i]['Species Illustration Photo'] !== null) {
            // console.log(data[i])

            // Get species photo and set the image src
            const f = data[i]['Species Illustration Photo'].src;
            fishes_img.src = f;
            fishes_img.setAttribute("style", "width:30%; height:30%;");
            like_btn.textContent = "0 likes ♥"
            like_btn.setAttribute("style", "margin-right: 1%;");

            like_btn.addEventListener('click', (e) => {
                e.preventDefault();
                increase = parseInt(like_btn.innerText.split(' ')[0]);
                console.log(increase)
                let str = (increase += 1) + ' ' + 'likes ♥';
                like_btn.innerText = str;
            })

            // Create label for species name
            const name = data[i]['Species Illustration Photo']['title'] ? data[i]['Species Illustration Photo']['title'] : data[i]['Species Name'];
            label.appendChild(document.createTextNode(name));
            label.setAttribute("style", "width:200px; height:50px; background-color:white; padding: 5px");


            //Create label for Taste Description
            const taste_descrip = data[i]['Taste'];
            const text_descrip = data[i]['Texture'] ? data[i]['Texture'] : '';
            const stripTaste_descrip = taste_descrip.replace(/<[^>]+>/g, '');
            const stripText_descrip = text_descrip.replace(/<[^>]+>/g, '');
            const tast_textdescrip = stripTaste_descrip + stripText_descrip
            Description.appendChild(document.createTextNode(`${tast_textdescrip}`));
            Description.setAttribute("style", "width:200px; height:50px; padding: 5px");

            // Append species image to div
            fishes_div.append(fishes_img);

            //Append Like button to div
            fishes_div.append(like_btn);

            // Append species label to div
            fishes_div.append(label);
            fishes_div.append(Description)

            // Append div containing species photo and name to parent div
            fish_display.append(fishes_div);



        }
    }
}

function newPost(e) {

    //form elements
    const inputimg = document.getElementById('fish-detail');

    const formDiv = document.createElement('div');
    const newInputURL = document.createElement('img');
    const newInputname = document.createElement('p');
    const newInputTaste = document.createElement('p');
    const newInputcomment = document.createElement('p');

    e.preventDefault();

    //Adding Fish Image from Form
    fishObjectimage = document.getElementById('new-image').value;
    newInputURL.src = fishObjectimage;
    newInputURL.setAttribute("style", "width:30%; height:30%;");
    

    //Adding Fish Name from Form
    fishObjectname = document.getElementById('new-name').value;
    newInputname.innerHTML = fishObjectname;
    

    //Adding Fish Taste from Form
    fishObjectTaste = document.getElementById('how-tasty').value;
    newInputTaste.innerHTML = `Taste: ${fishObjectTaste}/10`;
    

    //Adding Fish Comments
    fishObjectcomment = document.getElementById('new-comment').value;
    newInputcomment.innerHTML = `Comment: ${fishObjectcomment}`;
    

    //Appends form inputs to new div
    formDiv.append(newInputname);
    formDiv.append(newInputURL);
    formDiv.append(newInputTaste);
    formDiv.append(newInputcomment);
    formDiv.setAttribute("style", "margin: 2%");
    inputimg.append(formDiv);
   
    //Form Reset
    document.getElementById("fish-review").reset();
}

//Search button
const search_bar = document.getElementById('search-bar');
search_bar.addEventListener('keydown', (e) => { search(e) })
function search(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        //Looking through fish div where fish images are located
        const fish_display = document.getElementById('fish-img');
        const input = search_bar.value; //input from the search bar
        const display = fish_display.children;// Array of information we need to sort through to get fish name

        //Looping through fish display image children 
        for (let i = 0; i < display.length; i++) {
            //Looking through fish display image children name to find match
            if (display[i].children[2].outerText.toLowerCase().includes(input.toLowerCase())) {
                //A match is found then do nothing
                display[i].style.display = '';
            } else { //If match is not found then hide
                display[i].style.display = 'none';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', LoadImg);
