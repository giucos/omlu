import m from "/vendor/mithril.js";
import b from "/vendor/bss.js";

import {col} from "/core/utils.js";

const limit = 5000;

// 
const colorGray100 = '#FBFBFB';
const colorGray200 = '#F8F8F8';
const colorGray300 = '#D9D9D9';
const colorGray400 = '#B6B6B6';
const colorGray800 = '#333333';
const colorGray900 = '#111111';

const colorPink = '#D742FB';
const colorRosa = '#FF87FF';
const colorLavendel = '#B196FF';
const colorViolett = '#7C4DFF';
const colorBlue = '#84CEFF';
const colorLightBlue = '#B2FFFF';
const colorGreen = '#00FF93';
const colorNeoGreen = '#94FF57';

let icon = {
	reset: function(){
	  return m('svg[viewBox="0 0 24 24"]', [
		m('path[d="M8,4 L21,4 C22.1045695,4 23,4.8954305 23,6 L23,18 C23,19.1045695 22.1045695,20 21,20 L8,20 C7.49479181,20 7.26688156,19.8135296 6.80345396,19.3176949 C6.75712534,19.2681266 6.7099247,19.2160219 6.66192355,19.1616204 C6.47807387,18.9532567 6.31421472,18.7494307 6.23177872,18.6401844 L0.698291721,12 L1.23177872,11.3598156 L6.18176877,5.42511074 C6.28584987,5.27697368 6.44363308,5.06720208 6.62702438,4.85177708 C6.70024349,4.7657685 6.77251996,4.68522946 6.84400957,4.61079521 C7.22963038,4.20929073 7.51572647,4 8,4 Z M8.14992562,6.14822292 C8.01407942,6.30779792 7.88980013,6.47302632 7.76822128,6.6401844 L3.30164767,12.0000727 L7.79436009,17.3925528 C7.87696028,17.5005693 8.01456988,17.6717433 8.16160145,17.8383796 C8.1974634,17.8790233 8.23193807,17.9170798 8.2646108,17.9520373 C8.28044249,17.9689761 8.29568185,17.9849966 8.31020844,18 L21,18 L21,5.99999999 L8.28281512,6 C8.24198403,6.04270247 8.19723122,6.09265426 8.14992562,6.14822292 Z M14,10.5857864 L16.2928932,8.29289322 L17.7071068,9.70710678 L15.4142136,12 L17.7071068,14.2928932 L16.2928932,15.7071068 L14,13.4142136 L11.7071068,15.7071068 L10.2928932,14.2928932 L12.5857864,12 L10.2928932,9.70710678 L11.7071068,8.29289322 L14,10.5857864 Z"]'),
	  ]);
	},
}

//   <path fill-rule="evenodd" d="M8,4 L21,4 C22.1045695,4 23,4.8954305 23,6 L23,18 C23,19.1045695 22.1045695,20 21,20 L8,20 C7.49479181,20 7.26688156,19.8135296 6.80345396,19.3176949 C6.75712534,19.2681266 6.7099247,19.2160219 6.66192355,19.1616204 C6.47807387,18.9532567 6.31421472,18.7494307 6.23177872,18.6401844 L0.698291721,12 L1.23177872,11.3598156 L6.18176877,5.42511074 C6.28584987,5.27697368 6.44363308,5.06720208 6.62702438,4.85177708 C6.70024349,4.7657685 6.77251996,4.68522946 6.84400957,4.61079521 C7.22963038,4.20929073 7.51572647,4 8,4 Z M8.14992562,6.14822292 C8.01407942,6.30779792 7.88980013,6.47302632 7.76822128,6.6401844 L3.30164767,12.0000727 L7.79436009,17.3925528 C7.87696028,17.5005693 8.01456988,17.6717433 8.16160145,17.8383796 C8.1974634,17.8790233 8.23193807,17.9170798 8.2646108,17.9520373 C8.28044249,17.9689761 8.29568185,17.9849966 8.31020844,18 L21,18 L21,5.99999999 L8.28281512,6 C8.24198403,6.04270247 8.19723122,6.09265426 8.14992562,6.14822292 Z M14,10.5857864 L16.2928932,8.29289322 L17.7071068,9.70710678 L15.4142136,12 L17.7071068,14.2928932 L16.2928932,15.7071068 L14,13.4142136 L11.7071068,15.7071068 L10.2928932,14.2928932 L12.5857864,12 L10.2928932,9.70710678 L11.7071068,8.29289322 L14,10.5857864 Z"/>



export const plain = ({query, store, info}) => {

	const enabled = () => store()?.text != query()?.text;

	const tools = () => [
		m(`button`, {//+b`p 0 0.5ex; m 0.2ex; bc goldenrod; c white; br 0.5ex; cursor: pointer`, {
			disabled: !enabled(),
			onclick: () => { store(undefined); info(undefined) }
		},'reset')
	]

	const value = m.stream.merge([store, query]).map(([s,q])=> {
	  let text = s?.text ?? q?.text ?? ''
		return text.substr(0, q?.limit ?? limit)
	})

	const i = store.map(v => {
		let _
		if (!v)
			_ = { icn: plain.icon, col: col.unset };
		else if (v.text && v.text.length>0)
			_ = { icn: '', sub: v.text.length, col: col.green};
		else
			v = { icn: plain.icon, sub: 'ε', col: col.red};
		v && info(_);
		return _;
	});

	const resetButton = ()=> 
		//button
		m('button'+b`
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
			disabled: !enabled(),
			onclick: () => { store(undefined); info(undefined) }
		},
		//Button Icon
		m('div'+b`
			width: 24px;
			height: 24px;
			padding: 4px;
			background-color: #00FF93;
			border-radius: .25rem 0 0 .25rem;
			fill: white;
		`, icon.reset()),
		//button-text
		m('span'+b`
			margin: 0;
			padding: 0.5rem;
			font-size: 0.875rem;
			margin-right: 0.6rem;
		`, "Reset")
	);

	const nr = ()=> m('span'+b`
		padding: 0.625rem;
		font-size: 0.875rem;`, (value() && (value().length+'/'+ (query()?.limit ?? limit))) || '🚫'
	);
	

	return { view: () =>
		//main 
		m('div'+b` 
			border-left: 7px solid #00FF93;
			padding: 0;
			margin: 0;
			width: 100%;
			background-color: #F8F8F8;`, 
			//header
			m('div'+b`
				display: flex;
				justify-content: space-between;
				padding: 0.625rem;
				margin: 0;`,
				//header left
				m('div'+b`
					display: flex;
					width: 33%;
					font-size: 0.875rem;
					justify-content: flex-start;`, resetButton()),
				//header center
				m('div'+b`
					display: flex;
					width: 33%;
					font-size: 0.875rem;
					justify-content: center;`),
				//header right
				m('div'+b`
					display: flex;
					width: 33%;
					font-size: 0.875rem;
					justify-content: flex-end;`, nr())
			),
			//front
			m('div'+b`
				overflow: visible;
				padding: 0.625rem;
				display: table outside;
				font-size: 0.875rem;
				color: #B6B6B6;
				background: transparent;`,
				//Textarea
				m('textarea'+b`
					resize: none;
					outline: none;
					padding: 0.625rem;
					border: 1px solid #F8F8F8;
					background: white;
					width: 100%;
					color: black;
					font-size: 1.25rem;
					text-align: left;`
					.$focus(`border: 1px solid #00FF93;`),
					{
						value: value(),
						oncreate: ({dom}) => {
							var offset = dom.offsetHeight - dom.clientHeight + 3;
							dom.style['box-sizing'] = 'border-box';
							dom.style.height = 'auto';
							dom.style.height = dom.scrollHeight + offset + 'px';
							dom.addEventListener('input', ({target}) => {
							target.style.height = 'auto';
							target.style.height = target.scrollHeight + offset + 'px';
							});
						},
						oninput: ({target: t}) =>  {
							store({text: t.value.substr(0, query()?.limit || limit)});
						}
					}
				)
			)
		)
	}
}
plain.meta = {
	share: true,
	adjust: true,
}
plain.icon = "";
plain.presets = true;
plain.persistent = true;
plain.options = [
	{a: 'text', t: 'string', r: false, d: "", c: 'Text Preset' },
	{a: 'limit', t: 'number', r: false, d: limit, c: 'Number of chars allowed' },
]

export default plain;
