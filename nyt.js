const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //1
const key = 'zCBOvGg2GA7ymMo6D89AS7s6KPSbJVwT'; //2
let url; //3

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next'); // DECLARATIONS: these need to line up to your HTML!
const previousBtn = document.querySelector('.prev'); // these need to line up to your HTML!
const nav = document.querySelector('nav');// these need to line up to your HTML!

//RESULTS SECTION
const section = document.querySelector('section');

//EventListeners
searchForm.addEventListener('submit', fetchResults);  // calling listeners: need to align to your FUNCTION!
nextBtn.addEventListener('click', nextPage); // need to align to FX!
previousBtn.addEventListener('click', previousPage); // need to align to FX!

//Nav Variable
// nav.style.display = 'none';

let pageNumber = 0;
let displayNav = false;

function fetchResults(e){
    pageNumber = 0;
    fetchResults(e);
}

    //1
function fetchResults(e) {
  e.preventDefault(); //2   [The "(e)"is an EVENT HANDLING FUNCTION]
  // Assemble the full URL
  url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; //3
  console.log(url); //4

if(startDate.value !== '') {
    console.log(startDate.value)
  url += '&begin_date=' + startDate.value;
};

if(endDate.value !== '') {
  url += '&end_date=' + endDate.value;
};

  fetch(url)
  .then(function(result) {
    console.log(result)
    return result.json(); //2
}).then(function(json) {
    console.log(json);
    displayResults(json); //3
});
}

function displayResults(json) {

    while (section.firstChild) {
        section.removeChild(section.firstChild); //1
  
     } //* THIS started to give me an ERROR --- "articles is not defined?" ... see note below, after the "if(article.length >= 10)" which was moved to the end after the APPENDS 

let articles = json.response.docs;



    if(articles.length === 0) {
      console.log("No results");
    } else {
      for(let i = 0; i < articles.length; i++) {
        let article = document.createElement('article'); //1
        let heading = document.createElement('h2'); //2
        let link = document.createElement('a'); //1
        let img = document.createElement('img');  //1
        let para = document.createElement('p');   //1
        let clearfix = document.createElement('div'); //2
        
        let current = articles[i]; //2
        console.log("Current:", current); //3

        link.href = current.web_url; //4
        link.textContent = current.headline.main; //5

        para.textContent = 'Keywords: '; //3

            /*4*/
       for(let j = 0; j < current.keywords.length; j++) {
        //5
        let span = document.createElement('span');   
        //6
        span.textContent += current.keywords[j].value + ' ';   
        //7
        para.appendChild(span);
      }

   //2
   if(current.multimedia.length > 0) {
    //3
    img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
    //4
    img.alt = current.headline.main;
  }

       //8
       clearfix.setAttribute('class','clearfix');


        article.appendChild(heading); //3
        heading.appendChild(link); //6
        article.appendChild(img); //5
        article.appendChild(para);
        article.appendChild(clearfix);
        section.appendChild(article); //4
        
      }
    }

    if(articles.length >= 10) {
        nav.style.display = 'block'; //shows the nav display if 10 items are in the array
      } else {
        nav.style.display = 'block'; //hides the nav display if less than 10 items are in the array //change to block to get the prev btn to come back when there are less than 10 articles
      }    // the "articles is not defined" error went away when I moved this chunk AFTER the if(articles.length===0) conditional; (ASK????)
 }

function nextPage(e) {
    pageNumber++; //1
    fetchResults(e);  //2
    console.log("Page number:", pageNumber); //3
} //5

function previousPage(){
    if(pageNumber > 0) { //1
        pageNumber--; //2
      } else {
        return; //3
      }
      fetchResults(e); //4
      console.log("Page:", pageNumber); //5
}
