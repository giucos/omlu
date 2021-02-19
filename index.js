import m from '/vendor/mithril.js'
import b from '/vendor/bss.js'
import hs, {encode} from './hashstore.js'
import w from './wrapper.js'
import AceEditor from 'https://unpkg.com/ace-custom-element'

const {log, warn} = console,
  { stringify, parse} = JSON


let wrapper, runtime = {}

document.title = 'apps@'+self.location.host

hs.on = () => {
  if (!hs.get()) {
    hs.put({a: self.location.hash.slice(1)})
  }
  wrapper.store = hs.get()?.s
  try {
    wrapper.query = parse(hs.get()?.q)
  } catch (ex) {
    warn(ex.message)
  }
}

let info

const index = {
  oninit: () => {
    if (!hs.get()) {
      hs.put({a: self.location.hash.slice(1)})
    }
  },
  view: () => m('div', {
    run: document.title = hs.get()?.a+ '@'+ self.location.host
  },
    
    m('gem-wrapper', {
      oncreate({dom}) {
        wrapper = dom
        wrapper.store = hs.get()?.s
        try {
          wrapper.query = parse(hs.get()?.q)
        } catch (ex) {
          warn(ex.message)
        }
      },
      onchange: ({target}) => {
        if (target.tagName!='GEM-WRAPPER') return
        hs.put({s: target.store})
      },
      app: hs.get()?.a
    })
  )
}

m.mount(document.body, index)
