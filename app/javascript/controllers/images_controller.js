import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static classes = [ "visible" ]

  connect() {

  }

  getUrl(e) {
    navigator.clipboard.writeText(e.target.src)
    this.showMsg()
  }

  showMsg() {
    const toast = document.getElementById('toast')
    const classesToAdd = this.visibleClass.split(' ');
    toast.classList.add(...classesToAdd);
  }

}