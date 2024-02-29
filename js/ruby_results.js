import { results, mbtis } from './ruby_data.js'
// const mbti = new URLSearchParams(location.search).get('mbti')

const url = new URL(window.location.href);
const params = url.searchParams;
const mbti = params.get('mbti');
const result = results[mbtis[mbti]]

const characterEl = document.querySelector('.character')
const titleEl = document.querySelector('.result-title')
const boxEl = document.querySelector('.box')
const bestEl = document.querySelector('.best-img')
const worstEl = document.querySelector('.worst-img')

titleEl.innerHTML = result.title
characterEl.src = result.character
boxEl.innerHTML = result.results
bestEl.src = result.compatibility[0]
worstEl.src = result.compatibility[1]