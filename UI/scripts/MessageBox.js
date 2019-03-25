class MessageBox {
  constructor() {
    this._errorBox = document.getElementById('error-box');
    this._buttons = [...this._errorBox.getElementsByTagName('button')];
  }

  showErrorMessage(message, withButtons, event) {
    this._errorBox.style.opacity = '1';
    this._errorBox.firstElementChild.textContent = message;
    if (withButtons) {
      this._buttons.forEach((button) => {
        button.style.visibility = 'visible';
        if (event) {
          button.value = event.target.offsetParent.id;
        }
      });
    }
  }

  hideErrorMessage() {
    this._errorBox.style.opacity = '0';
    this._errorBox.firstElementChild.textContent = '';
    this._buttons.forEach(button => button.style.visibility = 'hidden');
  }

  // checkRemoval(event) {
  //   this.showErrorMessage('Do you really want to delete this post?');
  //   this._buttons.forEach((button) => {
  //     button.style.visibility = 'visible';
  //     button.value = event.target.offsetParent.id;
  //   });
  // }
}

const messageBox = new MessageBox();
