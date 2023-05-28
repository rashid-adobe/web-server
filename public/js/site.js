//const fetch = require('node-fetch')

console.log('site js loaded')

const locationInfo = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
locationInfo.addEventListener('submit', (e) => {
    e.preventDefault()
    let location = search.value;
    fetch('http://localhost:3000/products?search='+location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            messageOne.textContent = JSON.stringify(data);
        })    
    })
})