import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 'image', 'title', 'save' ]
  static classes = [ 'loading' ]
  static values = {id: String }

  connect() {
    const title= document.createElement('p')
    title.textContent = (this.imageTarget.alt).toUpperCase()
    title.contentEditable = true
    title.dataset.imagesTarget = 'title'
    title.dataset.action = 'click->images#editTitle'
    this.element.appendChild(title)
  }

  editTitle(e) {
    if (!this.hasSaveTarget) {
      const btn = document.createElement('button')
      btn.textContent = 'Save'
      btn.classList = 'bg-green-500 p-2'
      btn.dataset.imagesTarget = 'save'
      btn.dataset.action = 'click->images#saveTitle'
      e.target.insertAdjacentElement('afterend', btn)
    }
  }

  async saveTitle(e) {
    e.preventDefault()
    e.target.disabled = true
    e.target.classList.add(this.loadingClass)

    const formData = new FormData()

    formData.append('image[title]', this.titleTarget.innerText)

    await this.doPatch(`/api/images/${this.idValue}`, formData)

    e.target.remove()
  }
  getUrl(e) {
    navigator.clipboard.writeText(e.target.src)
  }

  async doPatch(url, body ) {
    const csrfToken = document.getElementsByName('csrf-token')[0].content

    await fetch(url, {
      method: "PATCH",
      body: body,
      headers: {
        "X-CSRF-Token": csrfToken
      }
    })
  }
}