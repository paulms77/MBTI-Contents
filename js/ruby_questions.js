import { questions } from "./ruby_data.js"

const progressValueEl = document.querySelector('.progress .value')
const numberEl = document.querySelector('.number')
const questionEl = document.querySelector('.question')
const choice1El = document.querySelector('.choice1')
const choice2El = document.querySelector('.choice2')

let currentNumber = 0
let mbti = [] // 사용자가 모든 질문에 답하면 여기에 담아서 결과페이지로 이동
let mbtiFinal = ''

// 가지고 있는 질문을 출력
function renderQuestion() {
  const question = questions[currentNumber]
  numberEl.innerHTML = question.number
  questionEl.innerHTML = question.question
  choice1El.innerHTML = question.choices[0].text
  choice2El.innerHTML = question.choices[1].text
  progressValueEl.style.width = ((currentNumber + 1) / 12) * 100 + '%'
}

function range(start, end, step=1){
  let array = []
  for (let i = start; i < end; ++i){
    if (!(i % step)){
      array.push(i)
    }
  }
  return array
}

function nextQuestion(choiceNumber) {
  const question = questions[currentNumber]
  mbti.push(question.choices[choiceNumber].value)
  //console.log(mbti)
  if (currentNumber < 12){
    for (var c in range(0, getMode(mbti).length)){
      if (getMode(mbti)[c][1] > 1){
        mbtiFinal = mbtiFinal + getMode(mbti)[c][0]
        //console.log(mbtiFinal)
      }
      mbtiFinal = [...new Set(mbtiFinal)].join('')
    }
    if (currentNumber === questions.length - 1){
      showResultPage()
      return
    }
  }
  currentNumber = currentNumber + 1
  renderQuestion()
}
 
function showResultPage() {
  location.href = '../results/ruby_results.html?mbti=' + mbtiFinal
}

function getMode(array) {
  const counts = array.reduce((pv, cv)=>{
    pv[cv] = (pv[cv] || 0) + 1
    return pv
  }, {})

  const result = []
  for (let key in counts) {
    result.push([key, counts[key]])
  }
  result.sort((first, second)=>{
    return second[1] - first[1]
  })
  return result
}

choice1El.addEventListener('click', function () {
  nextQuestion(0)
})

choice2El.addEventListener('click', function () {
  nextQuestion(1)
})

renderQuestion()