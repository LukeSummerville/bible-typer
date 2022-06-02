const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'

const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true;
  let incorrectCount = 0;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    //console.log(incorrectCount)
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
      console.log("is space")
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      //++incorrectCount;

      //document.getElementById("incorrect-count").innerHTML = incorrectCount;
     // incorrectCount++;

      correct = false
    }
  })

  if (correct) {
    console.log("Success")
    //console.log(wordCount)
    //console.log(arrayQuote.length)
    //console.log(timerElement.innerText)
    let WPM = (wordCount / timerElement.innerText) * 60
    console.log("Words per second: " + (wordCount / timerElement.innerText))
    console.log("Words per minute: " + WPM)
    document.getElementById("wpm").innerHTML = ("WPM: " + WPM.toFixed(1));


    console.log(arrayQuote.length / startTime)
    renderNewQuote()
  }
})

// function getRandomQuote() {
//   return fetch(RANDOM_QUOTE_API_URL)
//     .then(response => response.json())
//     .then(data => data.content)
// }
CHAPTER_LENGTHS = [
    33, 22, 35, 27, 23, 35, 27, 36, 18, 32,
    31, 28, 25, 35, 33, 33, 28, 24, 29, 30,
    31, 29, 35, 34, 28, 28, 27, 28, 27, 33,
    31
]

// Grab random chapter and then grab verse length and randomize?
function getRandomPassage() {
    let chapter = Math.floor(Math.random() * CHAPTER_LENGTHS.length) 
    //console.log(chapter);
    let verse = Math.floor(Math.random() * CHAPTER_LENGTHS[chapter])
    //console.log(verse)
    return 'Proverbs ' + chapter + ':' + verse
}

function getRandomQuote() {
    biblePas = getRandomPassage();
    //console.log("Before API call")
    //console.log(BIBLE_API_URL)
    let BIBLE_API_URL = 'https://api.esv.org/v3/passage/text/?q=' + getRandomPassage() + '&include-headings=False&include-footnotes=False&include-verse-numbers=False&include-short-copyright=False&include-passage-references=False&line-length=0&indent-paragraphs=0&indent-poetry=False&indent-paragraphs=0'
    return fetch(BIBLE_API_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Token b213599462cff5585a8002f0f51f3c930335454f'
        }
    })
      .then(response => response.json())
  }

  function getTestQuote() {
    biblePas = getRandomPassage();
    //console.log("Before API call")
    //console.log(BIBLE_API_URL)
    let BIBLE_API_URL = 'https://api.esv.org/v3/passage/text/?q=' + "Proverbs 11:22" + '&include-headings=False&include-footnotes=False&include-verse-numbers=False&include-short-copyright=False&include-passage-references=False&line-length=0&indent-paragraphs=0&indent-poetry=False&indent-paragraphs=0'
    return fetch(BIBLE_API_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Token b213599462cff5585a8002f0f51f3c930335454f'
        }
    })
      .then(response => response.json())
  }

function trimQuote(quote) {
   // console.log("Before split");
    //console.log(quote.passages[0]);
    quote = quote.replace(/^\s+|\s+$/gm,'');
    quote = quote.replace(/(\n)/gm, " ");
   // console.log("Aftr split");
   // console.log(quote[0]);
    quote = quote.replace(/[“]/g, '"')
    quote = quote.replace(/[”]/g, '"')
    quote = quote.replace(/[’]/g, "'")

  
    
    //console.log("Aftr quote");
    console.log(quote);
    return quote;
}
function WordCount(str) { 
    return str.split(" ").length;
  }
  
  //console.log(WordCount("hello world"));

let wordCount = 0;  
let timer1 = 0;
async function renderNewQuote() {
  const quote = await getRandomQuote()
  //const quote = await getTestQuote()
  //console.log(WordCount(quote));

  document.getElementById("passage").innerHTML = quote.query;
  
  quote[0] = trimQuote(quote.passages[0]);  
  wordCount = WordCount(quote[0]);
  //console.log(WordCount(quote[0]));

  quoteDisplayElement.innerHTML = ''
  quote[0].split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  timer1 = startTimer();
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

// var myArray = [
//     "Apples",
//     "Bananas",
//     "Pears"
//   ];
  
//   var randomItem = myArray[Math.floor(Math.random()*myArray.length)];
  
//   document.body.innerHTML = randomItem;
console.log("first render")
renderNewQuote()