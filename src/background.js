import 'chrome'
import '@babel/polyfill'
import { createImageElement, getImageSize } from './lib/resizer'
import { assert, Message } from './lib/utils'

chrome.contextMenus.create({
  contexts: ['image'],
  title: 'Resize to 50%',
  onclick: async (info, tab) => {
    assert(info.mediaType === 'image', 'expected image')
    chrome.tabs.sendMessage(tab.id, new Message('select_image', { src: info.srcUrl }))
  }
})
