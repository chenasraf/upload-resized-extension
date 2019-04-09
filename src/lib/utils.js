export function assert(cond, msg) {
  if (!Boolean(cond)) {
    throw new Error(msg)
  }
}

export class Message {
  constructor(action, payload) {
    assert(typeof action === 'string', 'action must be a string')
    this.action = action
    this.payload = payload
  }
}
