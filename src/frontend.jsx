import '@babel/polyfill'
import 'chrome'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import UploadResizer from './components/upload_resizer'

const __EL_ID = '__upload_resizer_box'

function bootstrap(imgSrc) {
  removeExistingBootstrap()
  const el = document.createElement('div')
  el.id = __EL_ID
  document.body.appendChild(el)
  ReactDOM.render(<UploadResizer image={imgSrc} />, el)
}

function removeExistingBootstrap() {
  const el = document.querySelector(`#${__EL_ID}`)
  if (el) {
    el.remove()
  }
}

chrome.runtime.onMessage.addListener((message, sender, respond) => {
  console.log('got msg', message, sender)
  if (message && message.action === 'select_image') {
    bootstrap(message.payload.src)
  }
  return true
})
