//php -S localhost:3000 server.php

import m from "/vendor/mithril.js";
import b from "/vendor/bss.js";

b.css(".animCorrect", `
  background-color: #6EBB79 !important;
  opacity: 1;
  transition: all 2s cubic-bezier(.86,-0.39,.22,.98) !important;
  transform: scale(1.5, 1.5) !important;
`);

b.css(".animWrong", `
  background-color: #CC6666 !important;
  opacity: 1;
  transition: all 3s cubic-bezier(.86,-0.39,.22,.98) !important;
  transform: scale(0.5, 0.5) !important;
`);

let allQuestions = [{
	question: "How does a Computer get drunk?",
	answers: [
		["What?", false],
		["It takes screenshots", true],
		["I don't know", false]
	]
}, {
	question: "What's the hardest programming language?",
	answers: [
		["Obviously, JAVASCRIPT.", false],
		["Brainfuck", false],
		["Malbolge", true],
	]
}, {
	question: "What does '[>+++++<-]' in Brainfuck do?",
	answers: [
		["Multiplication with a constant", true],
		["Easy: substraction!", false],
		["I'm a noob", false],
	]
}, {
	question: "Wer esch de ober G?",
	answers: [
		["superG, who else?", true],
		["natürlech...superG!", true],
		["gg ez - superG", true],
	]
}, {
	question: "Masterfrage: Wie hackt man?",
	answers: [
		["System.out.hack();", false],
		["hack(now);", false],
		["Guggus gsi, guggus geblieben.", true],
	]
}, {
	question: "Wie mega esch s'MegaQuiz?",
	answers: [
		["Besser als en Crèmeschnette", true],
		["Absolute bööörner", true],
		["Es esch scho rächt lit.", true],
	]
}, {
	question: "",
	answers: [
		["", true],
	]
}]

let correctSound = new Audio('correctSound.wav');
let wrongSound = new Audio('wrongSound.wav');
let shootingStars = new Audio('shootingStars.wav');

let current = 0;
let flag = false;

let highscoreList = setInterval(function () {
	if ((current + 1) === allQuestions.length) {
		shootingStars.play();
		const questionText = document.getElementById("questionText");
		const questionNumber = document.getElementById("questionNumber");
		const questionStatus = document.getElementById("questionStatus");
		const button0 = document.getElementById("answer0");
		const button1 = document.getElementById("answer1");
		const button2 = document.getElementById("answer2");
		const backButton = document.getElementById("backButton");
		const backButtonImage = document.getElementById("backButtonImage");
		const leaderboard = document.getElementById("leaderboard");
		questionText.style.display = "none";
		questionNumber.style.display = "none";
		questionStatus.style.display = "none";
		button0.style.display = "none";
		button1.style.display = "none";
		button2.style.display = "none";
		leaderboard.style.display = "unset";
		backButton.style.display = "unset";
		backButtonImage.style.display = "unset";
	}
}, 10);

function incrementCurrent() {
	current++;
	m.redraw();
}

function checkAnswer(buttonNumber) {
	if (allQuestions[current].answers[buttonNumber][1]) {
		setTimeout(() => { correctSound.play(); }, 800);
		animationCorrect(buttonNumber);
		flag = false;

	} else {
		setTimeout(() => { wrongSound.play(); }, 800);
		animationWrong(buttonNumber);
		flag = false;
	}
}

function animationCorrect(buttonNumber) {
	const animCorrectRemove = () => {
		const elem = document.getElementById("answer" + [buttonNumber]);
		elem.classList.remove("animCorrect");
		while (!flag) {
			setTimeout(() => { incrementCurrent(); }, 1000);
			flag = true;
		}

	};
	const elem = document.getElementById("answer" + [buttonNumber]);
	elem.classList.add("animCorrect");
	elem.addEventListener("transitionend", animCorrectRemove);
}

function animationWrong(buttonNumber) {
	const animWrongRemove = () => {
		const elem = document.getElementById("answer" + [buttonNumber]);
		elem.classList.remove("animWrong");
		while (!flag) {
			setTimeout(() => { incrementCurrent(); }, 1000);
			flag = true;
		}
	};
	const elem = document.getElementById("answer" + [buttonNumber]);
	elem.classList.add("animWrong");
	elem.addEventListener("transitionend", animWrongRemove);
}

export const megaquiz = () => {

	const onClickAnswer0 = () => {
		checkAnswer(0);
	}
	const onClickAnswer1 = () => {
		checkAnswer(1);
	}
	const onClickAnswer2 = () => {
		checkAnswer(2);
	}
	const onClickBack = () => {
		setTimeout(() => { location.reload(); }, 100);
	}
	//============================================
	// Button 
	//=============================================
	const button = (id, text, onClickFunction) =>
		//Button
		m('button#' + id + b`
            padding: 0;
            margin: 5px;
            display: flex;
			width: 256px;
			height: 38px;
			background: #7C4DFF;
			border: none;
			box-sizing: border-box;
			border-radius: 10px;
			filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
			transition: 0.5s;
        `
			.$focus(`outline: none;`)
			.$active(`outline: none;`)
			.$hover(`background: #A78AF6 ; cursor:pointer; transition: 0.5s; `),
			{
				onclick: onClickFunction.bind()
			},
			//button-text
			text ? m('span' + b`
            font-family: Roboto;
			font-size: 18px;
			line-height: 140%;
			text-align: center;
			color: #FFFFFF;
			margin: auto;
        `, text) : null
		);
	//============================================
	// Back Button 
	//=============================================
	const backButton = (id, onClickFunction) =>
		//Button
		m('backButton#' + id + b`
            padding: 10;
            margin: 7px;
            width: 100px;
            height: 35px;
            background: #7C4DFF;
            border: none;
            box-sizing: border-box;
            border-radius: 6px;
            filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
            transition: 0.5s;
			display: none;
            `
			.$focus(`outline: none;`)
			.$active(`outline: none;`)
			.$hover(`cursor:pointer; transition: 0.5s`),
			{
				onclick: onClickFunction.bind()
			}
		);
	//==================================================
	//  play Mode View 
	//==================================================                                          
	const playView = () => m('div' + b` 
		border-left: 10px solid #7C4DFF;
		border-top: 1px solid #DDDDDD;
		border-bottom: 1px solid #DDDDDD;
		border-right: 1px solid #DDDDDD;
		height: 350px;
		background-color: #FFFFFF;
		width: 95vw;
		height: 350px;
		margin-left: -5px;
		margin: auto;
		margin-top: auto;
        `,
		//header
		m('div' + b`
            display: flex;
            justify-content: space-between;
            padding: 0.625rem;
            margin: 0;
			background-color: #FFFFFF;
            `,
			//header right
			m('div' + b`
                text-align: left;
                width: auto;
                font-size: 20px;
            	font-family: 'Roboto', sans-serif;
            	font-weight: 400;
                justify-content: flex-end;
				padding-top: 7px;
            `, "Quiz 1.1: Computer Science stuff - get amazed",
			),
			m('img' + b`
				height: 40px;
				width: auto;
				float: right;
				`, { src: "logo.png" }
			)
		),
		m('div' + b`
            overflow: visible;
            padding: 0.625rem;
            display: table outside;
            font-size: 0.875rem;
            color: #B6B6B6;
			background: transparent;
			border-top: 2px solid #DDDDDD;
            `,

			m('div#questionNumber' + b`   
            width: 100%;
            padding-top: 0.5rem;
			color: black;
            font-size: 20px;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            text-align: left;
            `, "Question #" + (current + 1)),

			m('div#questionText' + b`   
            width: 100%;
            padding-top: 0.5rem;
			color: black;
            font-size: 20px;
            font-family: 'Roboto', sans-serif;
            font-weight: 300;
            text-align: left;
			font-style: italic;
            `, allQuestions[current].question)
		),
		m('div#questionStatus' + b`
      			margin-left: 95%;
     			margin-top: -60px;
				color: #C5C5C5;
				font-size: 15px;
     		`, "(" + (current + 1) + "/" + (allQuestions.length - 1) + ")",
		),
		m('div' + b`
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			height: 80%;
        `,
			button("answer0", allQuestions[current].answers[0], onClickAnswer0),
			button("answer1", allQuestions[current].answers[1], onClickAnswer1),
			button("answer2", allQuestions[current].answers[2], onClickAnswer2),
			
			m('img#leaderboard' + b`   
			width: 500px;
			height: 182px;
			margin-top: -50px;
			display: none;
            `, { src: "leaderboard.png" }
			),
		),
		m('div' + b`
			display: flex;
			justify-content: flex-end;
			margin-top: -69px;
			padding-right: 5px;
            `, backButton("backButton", onClickBack)
        ),
        m('div' + b`
		display: flex;
		justify-content: flex-end;
		height: 8.3%;
		margin-top: -45px;
		padding-right: 8px;
        `,
            m('img#backButtonImage' + b`
                height: 100%;
                margin: 6px;
                z-index: 1;
				display: none;
                `, { src: "backButton.png" } 
            )
        )
	)
	return {
		view: () => playView()
	}
}
megaquiz.meta = {
	share: false,
	adjust: true,
}
megaquiz.icon = "📄";
megaquiz.presets = true;
megaquiz.persistent = true;
export default megaquiz;