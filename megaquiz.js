import m from "/vendor/mithril.js";
import b from "/vendor/bss.js";
import { compress } from "/core/utils.js";

const limit = 500;
let offset = 0;

// 
const color = {
	gray100: '#FBFBFB',
	gray200: '#F8F8F8',
	gray300: '#D9D9D9',
	gray400: '#B6B6B6',
	gray800: '#333333',
	gray900: '#111111',
	pink: '#D742FB',
	rosa: '#FF87FF',
	lavendel: '#B196FF',
	violett: '#7C4DFF',
	blue: '#84CEFF',
	lightBlue: '#B2FFFF',
	green: '#00FF93',
	neoGreen: '#94FF57',
}

const icon = {
	reset: m('svg[id="reset"][fill="white"][width="24"][height="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
		m('path[d="M8,4 L21,4 C22.1045695,4 23,4.8954305 23,6 L23,18 C23,19.1045695 22.1045695,20 21,20 L8,20 C7.49479181,20 7.26688156,19.8135296 6.80345396,19.3176949 C6.75712534,19.2681266 6.7099247,19.2160219 6.66192355,19.1616204 C6.47807387,18.9532567 6.31421472,18.7494307 6.23177872,18.6401844 L0.698291721,12 L1.23177872,11.3598156 L6.18176877,5.42511074 C6.28584987,5.27697368 6.44363308,5.06720208 6.62702438,4.85177708 C6.70024349,4.7657685 6.77251996,4.68522946 6.84400957,4.61079521 C7.22963038,4.20929073 7.51572647,4 8,4 Z M8.14992562,6.14822292 C8.01407942,6.30779792 7.88980013,6.47302632 7.76822128,6.6401844 L3.30164767,12.0000727 L7.79436009,17.3925528 C7.87696028,17.5005693 8.01456988,17.6717433 8.16160145,17.8383796 C8.1974634,17.8790233 8.23193807,17.9170798 8.2646108,17.9520373 C8.28044249,17.9689761 8.29568185,17.9849966 8.31020844,18 L21,18 L21,5.99999999 L8.28281512,6 C8.24198403,6.04270247 8.19723122,6.09265426 8.14992562,6.14822292 Z M14,10.5857864 L16.2928932,8.29289322 L17.7071068,9.70710678 L15.4142136,12 L17.7071068,14.2928932 L16.2928932,15.7071068 L14,13.4142136 L11.7071068,15.7071068 L10.2928932,14.2928932 L12.5857864,12 L10.2928932,9.70710678 L11.7071068,8.29289322 L14,10.5857864 Z"]')
	),
	standalone: m('svg[id="standalon"][fill="white"][width="24"][height="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
		m('path[fill-rule="evenodd"][d="M19,14 L19,19 C19,20.1045695 18.1045695,21 17,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L10,5 L10,7 L5,7 L5,19 L17,19 L17,14 L19,14 Z M18.9971001,6.41421356 L11.7042068,13.7071068 L10.2899933,12.2928932 L17.5828865,5 L12.9971001,5 L12.9971001,3 L20.9971001,3 L20.9971001,11 L18.9971001,11 L18.9971001,6.41421356 Z"]')
	),
	fullscreen: m('svg[id="fullscreen"][fill="white"][height="24"][width="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
		m('polygon[fill-rule="evenodd"][points="13.414 12 19 17.586 19 14 21 14 21 21 14 21 14 19 17.586 19 12 13.414 6.414 19 10 19 10 21 3 21 3 14 5 14 5 17.586 10.586 12 5 6.414 5 10 3 10 3 3 10 3 10 5 6.414 5 12 10.586 17.586 5 14 5 14 3 21 3 21 10 19 10 19 6.414"]')
	),
	play: m('svg[id="fullscreen"][fill="white"][height="24"][width="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
		m('path[fill-rule="evenodd"][d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M8,17 L8,7 C8,6.21456446 8.86395093,5.73572169 9.52999894,6.1520017 L17.5299989,11.1520017 C18.156667,11.5436692 18.156667,12.4563308 17.5299989,12.8479983 L9.52999894,17.8479983 C8.86395093,18.2642783 8,17.7854355 8,17 Z M15.1132038,12 L10,8.80424764 L10,15.1957524 L15.1132038,12 Z"]')
	),
	add: m('svg[id="fullscreen"][fill="white"][height="24"][width="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
		m('path[fill-rule="evenodd"][d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M13,11 L17,11 L17,13 L13,13 L13,17 L11,17 L11,13 L7,13 L7,11 L11,11 L11,7 L13,7 L13,11 Z"]')
	),
	delete: m('svg[id="fullscreen"][fill="white"][height="24"][width="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
		m('path[fill-rule="evenodd"][d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M7,13 L7,11 L17,11 L17,13 L7,13 Z"]')
	),
	back: m('svg[id="fullscreen"][fill="white"][height="24"][width="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
		m('path[fill-rule="evenodd"][d="M12.7071068,17.2928932 L11.2928932,18.7071068 L4.58578644,12 L11.2928932,5.29289322 L12.7071068,6.70710678 L7.41421356,12 L12.7071068,17.2928932 Z M12.4142136,12 L17.7071068,17.2928932 L16.2928932,18.7071068 L9.58578644,12 L16.2928932,5.29289322 L17.7071068,6.70710678 L12.4142136,12 Z"]')
	),
	forward: m('svg[id="fullscreen"][fill="white"][height="24"][width="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
		m('path[fill-rule="evenodd"][d="M11.2928932,6.70710678 L12.7071068,5.29289322 L19.4142136,12 L12.7071068,18.7071068 L11.2928932,17.2928932 L16.5857864,12 L11.2928932,6.70710678 Z M6.29289322,6.70710678 L7.70710678,5.29289322 L14.4142136,12 L7.70710678,18.7071068 L6.29289322,17.2928932 L11.5857864,12 L6.29289322,6.70710678 Z"]')
	),
	succeed: m('svg[id="fullscreen"][fill="white"][height="24"][width="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
		m('path[fill-rule="evenodd"][d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M10,13.5857864 L15.2928932,8.29289322 L16.7071068,9.70710678 L10,16.4142136 L6.29289322,12.7071068 L7.70710678,11.2928932 L10,13.5857864 Z"]')
	),
	fail: m('svg[id="fullscreen"][fill="white"][height="24"][width="24"][viewBox="0 0 24 24"][xmlns="http://www.w3.org/2000/svg"]',
		m('path[fill-rule="evenodd"][d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M12,13.4142136 L8.70710678,16.7071068 L7.29289322,15.2928932 L10.5857864,12 L7.29289322,8.70710678 L8.70710678,7.29289322 L12,10.5857864 L15.2928932,7.29289322 L16.7071068,8.70710678 L13.4142136,12 L16.7071068,15.2928932 L15.2928932,16.7071068 L12,13.4142136 Z"]')
	),
}



export const flashcard = ({ query, store, info }) => {

	// default values
	query = query.map(q => Object.assign({
		label: q.label || 'Empty'
	}, q))
	/*
		const cards = m.stream.merge([store, query]).map(([s,q])=> {
		  let c = s?.cards ?? q?.cards ?? ''
			return c
		})
	*/
	let mode = 'edit';
	let type = 'q';
	let i = 0;
	let cards = store()?.cards || query()?.cards || [{ "q": "Your Question", "a": "Your Answer" }];
	console.log(cards)
	let numberOfCards = (cards && cards.length) || 0;

	//	const enabledReset = () => store()?.text != query()?.text;
	const onClickChangeMode = () => {
		if (mode === 'edit') {
			mode = 'play';
		} else if (mode === 'play') {
			mode = 'edit';
		}
	}

	const onClickStandalone = () => {
		window.open('https://gem.omlu.ch/app#0=' + compress({
			a: 'diflashcard', q: JSON.stringify(query()), s: store()
		}, "_"))
	}

	const onClickFullScreen = () => { }
	const onClickPrevious = () => {
		i--;
		if (i < 0) { i = numberOfCards - 1 };
		type = 'q';
	}

	// forward button function
	// todo: next question
	const onClickNext = () => {
		i++;
		if (i >= numberOfCards) { i = 0 };
		type = 'q';
	}
	const onClickAnswer = () => {
		if (type === 'q') { type = 'a' } else { type = 'q' }
	}
	const onClickDelete = () => {
		cards.splice(i, 1);
		numberOfCards--;
		i--;
		if (i < 0) { i = numberOfCards - 1 }
	}


	const onClickAdd = () => {
		cards.push({ "q": "Type your Question", "a": "Type your Answer" });
		i = numberOfCards;
		numberOfCards++;
	}

	// ============================================
	//
	// Button 
	//
	const button = (icon, text, onClickFunction) =>

		//Button
		m('button' + b`
			height: 2rem;
			padding: 0;
			margin: 0;
			display: flex;
			border: #00FF93;
			background-color: white;
			border-radius: .25rem;
			transition: all .25s ease-in-out;
		`
			.$focus(`outline: none; border: none;`)
			.$active(`outline: none; border: none;`)
			.$hover(`background: #00FF93; cursor:pointer;`),
			{
				//			disabled: !enabled(),
				onclick: onClickFunction.bind()
			},
			//Button Icon
			m('div' + b`
			padding: 4px;
			background-color: #00FF93;
			border-radius: .25rem 0 0 .25rem;
			display: flex;
			align-items: center;
		`, icon),
			//button-text
			text ? m('span' + b`
			margin: 0;
			margin-right: 0.6rem;
			padding: 0.5rem;
			font-size: 0.875rem;
		`, text) : null
		);

	// ============================================
	//
	// Textfield 
	//
	const textfield = (mode, type, content) =>
		m('div' + b`
			overflow: visible;
			padding: 0.625rem;
			display: table outside;
			font-size: 0.875rem;
			color: #B6B6B6;
			background: transparent;
			`,
			m('div' + b`								// Label
			position: absolute;
			padding: 0.2rem 0 0 0.2rem;
		`, (type === 'q') ? 'Front' : 'Back'),
			m(((mode === 'edit') ? 'textarea' : 'div') + b`   
			width: 100%;
			resize: none;
			padding: 0.625rem;
			padding-top: 1.25rem;
			outline: none;
			border: 1px solid #F8F8F8;
			background: #FFFFFF;
			color: black;
			font-size: 1.5rem;
			text-align: center;
			`.$focus(`border: 1px solid #00FF93;`),
				(mode === 'play') ? { innerText: (type === 'q') ? content.q : content.a, } :
					(mode === 'hidden') ? { innerText: "  ??? " } :
						{
							value: (type === 'q') ? content.q : content.a,
							oncreate: ({ dom }) => {
								var offset = dom.offsetHeight - dom.clientHeight + 3;
								dom.style['box-sizing'] = 'border-box';
								dom.style.height = 'auto';
								dom.style.height = dom.scrollHeight + offset + 'px';
								dom.addEventListener('input', ({ target }) => {
									target.style.height = 'auto';
									target.style.height = target.scrollHeight + offset + 'px';
								});
							},
							oninput: (({ target: t }) => {
								if (type === 'q') {
									content.q = t.value.substr(0, limit);
								} else {
									content.a = t.value.substr(0, limit);
								}
							})
						}
			)
		);



	const nOfAll = () => m('span' + b`
		padding: 0.625rem;
		font-size: 0.875rem;`, ((i + 1) + '/' + numberOfCards)
	);

	const spacer = () => m('span' + b`width:4px;`)


	//==================================================
	//  play Mode View 
	//==================================================                                          
	const playView = () => m('div' + b` 
		border-left: 7px solid #00FF93;
		padding: 0;
		margin: 0;
		width: 100%;
		background-color: #F8F8F8;
		`,
		//header
		m('div' + b`
			display: flex;
			justify-content: space-between;
			padding: 0.625rem;
			margin: 0;
			`,
			//header left
			m('div' + b`
				align-items: center;		
				display: flex;
				width: 33%;
				font-size: 0.875rem;
				justify-content: flex-start;`, button(icon.play, 'Edit Deck', onClickChangeMode)
			),
			//header center
			m('div' + b`
				align-items: center;		
				display: flex;
				width: 33%;
				font-size: 0.875rem;
				justify-content: center;
			`, query().label + ' Deck'),
			//header right
			m('div' + b`
				align-items: center;
				display: flex;
				width: 33%;
				font-size: 0.875rem;
				justify-content: flex-end;
			`, nOfAll(),
				button(icon.fullscreen, '', onClickFullScreen),
				spacer(),
				button(icon.standalone, '', onClickStandalone)
			)
		),


		textfield('play', 'q', cards[i]), //question 'fragen'
		textfield('hidden', 'a', cards[i]), //answer 'antworten'

		//footer
		m('div' + b`
			display: flex;
			justify-content: space-between;
			padding: 0.625rem;
			margin: 0;`,
			//footer left
			m('div' + b`
				align-items: center;		
				display: flex;
				width: 20%;
				font-size: 0.875rem;
				justify-content: flex-start;`,  ),
			//footer center
			m('div' + b`
				align-items: center;		
				display: flex;
				width: 60%;
				font-size: 0.875rem;
				justify-content: center;`),
			//footer right
			m('div' + b`
				align-items: center;
				display: flex;
				width: 20%;
				font-size: 0.875rem;
				justify-content: flex-end;`,
				button(icon.back, '', onClickPrevious),
				spacer(),
				button(icon.forward, '', onClickAnswer),
				button(icon.fail, 'fail', onClickAnswer)

			)
		)
	)


	const editView = () => m('div' + b` 
				border-left: 7px solid #00FF93;
				padding: 0;
				margin: 0;
				width: 100%;
				background-color: #F8F8F8;`,
		//header
		m('div' + b`
					display: flex;
		
					justify-content: space-between;
					padding: 0.625rem;
					margin: 0;`,
			//header left
			m('div' + b`
						align-items: center;		
						display: flex;
						width: 33%;
						font-size: 0.875rem;
						justify-content: flex-start;`, button(icon.play, 'Play Deck', onClickChangeMode)),
			//header center
			m('div' + b`
						align-items: center;		
						display: flex;
						width: 33%;
						font-size: 0.875rem;
						justify-content: center;`, query().label + ' Deck'),
			//header right
			m('div' + b`
						align-items: center;
						display: flex;
						width: 33%;
						font-size: 0.875rem;
						justify-content: flex-end;`,
				nOfAll(),
				button(icon.fullscreen, '', onClickFullScreen),
				spacer(),
				button(icon.standalone, '', onClickStandalone)
			)
		),

		textfield(mode, 'q', cards[i]),
		textfield(mode, 'a', cards[i]),


		//footer
		m('div' + b`
					display: flex;
					justify-content: space-between;
					padding: 0.625rem;
					margin: 0;`,
			//footer left
			m('div' + b`
						align-items: center;		
						display: flex;
						width: 40%;
						font-size: 0.875rem;
						justify-content: flex-start;`,
				button(icon.delete, 'Delete Card', onClickDelete),
				spacer(),
				button(icon.add, 'Add Card', onClickAdd)),
			//footer center
			m('div' + b`
						align-items: center;		
						display: flex;
						width: 20%;
						font-size: 0.875rem;
						justify-content: center;`),
			//footer right
			m('div' + b`
						align-items: center;
						display: flex;
						width: 40%;
						font-size: 0.875rem;
						justify-content: flex-end;`,
				button(icon.back, '', onClickPrevious),
				spacer(),
				button(icon.forward, '', onClickNext)
			)
		)
	)

	return {
		view: () => (mode === 'play') ? playView() : editView()
	}
}

flashcard.meta = {
	share: false,
	adjust: true,
}
flashcard.icon = "📄";
flashcard.presets = true;
flashcard.persistent = true;
flashcard.options = [
	{ a: 'label', t: 'string', r: false, d: "", c: 'Card Deck Name' },
	{ a: 'theme', t: 'string', r: true, d: "di", c: 'di, exorciser' },
	{ a: 'cards', t: 'array', r: false, d: [], c: 'Array of Card-Objects with (q)uestions and (a)nswers example [{"q": "1st question","a":"1st answer"},{"q": "2nd question","a":"2nd answer"}]' },
]

export default flashcard;
