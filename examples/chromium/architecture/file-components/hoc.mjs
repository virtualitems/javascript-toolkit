import collection from './collection.mjs'
import component from './component.mjs'
import { subject, eventName } from './subject.mjs'

component.addEventListener('click', () => {
  subject.dispatchEvent(new CustomEvent(eventName, { detail: 'Component clicked!' }))
})

for (const element of collection) {
  element.addEventListener('click', () => {
    subject.dispatchEvent(
      new CustomEvent(eventName, { detail: 'Collection item clicked!' })
    )
  })
}

subject.addEventListener(eventName, (event) => {
  console.log('Event received:', event.detail)
})
