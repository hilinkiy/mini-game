const start = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time__list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const score = document.querySelector('#score');
const colors = ['#9381ff', '#023047', '#688e26', '#84dcc6', '#fee440', '#ff006e', '#ffc300', '#f08080', '#a4161a'];
let time = 0

start.addEventListener('click', (event) => {
	event.preventDefault();
	screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
	if(event.target.classList.contains('time-btn')){
		screens[1].classList.add('up')
		time = parseInt(event.target.getAttribute('data-time'));
		startGame()
	}
})

board.addEventListener('click', (event) => {
	if(event.target.classList.contains('circle')){
		score.innerHTML++
		event.target.remove()
		createRandomCircle()
	}
})

const startGame = () => {
	setInterval(decreaseTime, 1000)
	setTime(time)
	createRandomCircle()

}

const decreaseTime = () => {

	if (time === 0) {
		finishGame()
	} else {
		let currentTime = --time
		if (currentTime < 10) {
			currentTime = `0${currentTime}`
		}
		setTime(currentTime)
	}
}

const setTime = (value) => {
	timeEl.innerHTML = `00:${value}`
}

const finishGame = () => {
	board.innerHTML = `<h1>Cчет: ${score.innerHTML}</h1>`
	timeEl.parentNode.classList.add('hide')
	score.parentNode.classList.add('hide')
}

const createRandomCircle = () => {
	const circle = document.createElement('div');
	const size = randomSize(10, 60)
	const {width, height} = board.getBoundingClientRect()
	const x = randomSize(0, width - size)
	const y = randomSize(0, height - size)
	const color = randomColor()
	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	circle.style.background = color;
	board.append(circle)
}

const randomSize = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min)
}

const randomColor = () => {
	const i = Math.floor(Math.random() * colors.length);

	return colors[i]
}

const winTheGame = () => {
	const kill = () => {
		const circle = document.querySelector('.circle');

		if(circle) {
			circle.click()
		}
	}
	setInterval(kill, 1)
}