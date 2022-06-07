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
      //console.log("is space")
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) {
    console.log("Success")
    let WPM = (wordCount / timerElement.innerText) * 60
    console.log("Words per second: " + (wordCount / timerElement.innerText))
    document.getElementById("wpm").innerHTML = ("WPM: " + WPM.toFixed(1));
    renderNewQuote()
  }
})


CHAPTER_LENGTHS = [
    33, 22, 35, 27, 23, 35, 27, 36, 18, 32,
    31, 28, 25, 35, 33, 33, 28, 24, 29, 30,
    31, 29, 35, 34, 28, 28, 27, 28, 27, 33,
    31
]

CHAPTER_LENGTHS1 = [
  [25,	23,	17,	25,	48,	34,	29,	34,	38,	42,	3,	5,	58,	36,	39,	28,	27,	35,	3,	34,	46,	46,	39,	51,	46,	75,	66,	2],
  [45,	28,	35,	41,	43,	56,	37,	38,	5,	52,	33,	44,	37,	72,	47,	2],												
  [8,	52,	38,	44,	39,	49,	5,	56,	62,	42,	54,	59,	35,	35,	32,	31,	37,	43,	48,	47,	38,	71,	56,	53],				
  [51,	25,	36,	54,	47,	71,	53,	59,	41,	42,	57,	5,	38,	31,	27,	33,	26,	4,	42,	31,	25],							
  [26,	47,	26,	37,	42,	15,	6,	4,	43,	48,	3,	25,	52,	28,	41,	4,	34,	28,	4,	38,	4,	3, 35,	27,	27,	32,	44,	31],
  [32,	29,	31,	25,	21,	23,	25,	39,	33,	21,	36,	21,	14,	23,	33,	27],												
  [31,	16,	23,	21,	13,	2,	4,	13,	27,	33,	34,	31,	13,	4,	58,	24],												
  [24,	17,	18,	18,	21,	18,	16,	24,	15,	18,	33,	21,	13],															
  [24,	21,	29,	31,	26,	18],																						
  [23,	22,	21,	32,	33,	24],																						
  [3,	3,	21,	23],																								
  [29,	23,	25,	18],																								
  [1,	2,	13,	18,	28],																							
  [12,	17,	18],																									
  [2,	15,	16,	16,	25,	21],																						
  [18,	26,	17,	22],																								
  [16,	15,	15],																									
  [25],																											
  [14,	18,	19,	16,	14,	2,	28,	13,	28,	39,	4,	29,	25],															
  [27,	26,	18,	17,	2],																							
  [25,	25,	22,	19,	14],																							
  [21,	22,	18],																									
  [1,	29,	24,	21,	21],																							
  [13],																											
  [15],																											
  [25],																											
  [2,	29,	22,	11,	14,	17,	17,	13,	21,	11,	19,	17,	18,	2,	8,	21,	18,	24,	21,	15,	27,	21]		
]

NEW_TESTAMENT = [
  'Matthew',
  'Mark',
  'Luke',
  'John',
  'Acts',
  'Rom',
  '1 Cor',
  '2 Cor',
  'Gal',
  'Eph',
  'Phil',
  'Col',
  '1Thess',
  '2Thess',
  '1 Tim',
  '2 Tim',
  'Titus',
  'Phlm',
  'Heb',
  'James',
  '1 Peter',
  '2 Peter',
  '1 John',
  '2 John',
  '3 John',
  'Jude', 
  'Rev'
]

function getRandomBibleVerseNT() {
  let book = Math.floor(Math.random() * NEW_TESTAMENT.length); // pick random book from 0 to 27
  let chapter = Math.floor(Math.random() * CHAPTER_LENGTHS1[book].length) //
  let verse = Math.floor(Math.random() * CHAPTER_LENGTHS1[book][chapter])
  return NEW_TESTAMENT[book] + " " + chapter + ':' + verse
}

// Grab random chapter and then grab verse length and randomize?
function getRandomProverb() {
    let chapter = Math.floor(Math.random() * CHAPTER_LENGTHS.length) 
    //console.log(chapter);
    let verse = Math.floor(Math.random() * CHAPTER_LENGTHS[chapter])
    //console.log(verse)
    return 'Proverbs ' + chapter + ':' + verse
}

function getBibleVerseFromAPI() {
    biblePas = getRandomBibleVerseNT();
    //console.log("Before API call")
    //console.log(BIBLE_API_URL)
    let BIBLE_API_URL = 'https://api.esv.org/v3/passage/text/?q=' + getRandomBibleVerseNT() + '&include-headings=False&include-footnotes=False&include-verse-numbers=False&include-short-copyright=False&include-passage-references=False&line-length=0&indent-paragraphs=0&indent-poetry=False&indent-paragraphs=0'
    return fetch(BIBLE_API_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Token b213599462cff5585a8002f0f51f3c930335454f'
        }
    })
      .then(response => response.json())
  }

  function getTestQuote() {
    let BIBLE_API_URL = 'https://api.esv.org/v3/passage/text/?q=' + "John 1:1" + '&include-headings=False&include-footnotes=False&include-verse-numbers=False&include-short-copyright=False&include-passage-references=False&line-length=0&indent-paragraphs=0&indent-poetry=False&indent-paragraphs=0'
    return fetch(BIBLE_API_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Token b213599462cff5585a8002f0f51f3c930335454f'
        }
    })
      .then(response => response.json())
  }

function trimQuote(quote) {
    quote = quote.replace(/^\s+|\s+$/gm,'');
    quote = quote.replace(/(\n)/gm, " ");
    quote = quote.replace(/[“]/g, '"')
    quote = quote.replace(/[”]/g, '"')
    quote = quote.replace(/[’]/g, "'")
    quote = quote.replace(/[—]/g, " -")
    console.log(quote);
    return quote;
}

let wordCount = 0;  
function WordCount(str) { 
    return str.split(" ").length;
  }

let timer1 = 0;
async function renderNewQuote() {
  const quote = await getBibleVerseFromAPI()
  //const quote = await getTestQuote()

  document.getElementById("passage").innerHTML = quote.query;
  
  quote[0] = trimQuote(quote.passages[0]);  
  wordCount = WordCount(quote[0]);

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

console.log("first render")
renderNewQuote()
