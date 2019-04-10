import 'chrome'
import '@babel/polyfill'
import { assert, Message } from './lib/utils'

function item(title, ratio) {
  return {
    contexts: ['image'],
    title,
    onclick: async (info, tab) => {
      assert(info.mediaType === 'image', 'expected image')
      chrome.tabs.sendMessage(tab.id, new Message('select_image', { src: info.srcUrl, ratio }))
    }
  }
}

chrome.contextMenus.create(item('Resize to 25%', 0.25))
chrome.contextMenus.create(item('Resize to 50%', 0.5))
chrome.contextMenus.create(item('Resize to 75%', 0.75))
chrome.contextMenus.create(item('Custom resize...'))
