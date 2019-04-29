class MessageBox {
  constructor() {
    this._messageBox = document.getElementById('error-box');
    this._message = this._messageBox.firstElementChild;

    [this._okButton, this._cancelButton] = this._messageBox.getElementsByTagName('button');
    this._cancelButton.addEventListener('click', () => this.toggleMessageBox());

    this.isShown = false;

    this._listenerType = undefined;
  }

  static get CHECK_FIELDS() {
    return 'Please, check the description and hashtags field and try again.';
  }

  static get REMOVE_POST() {
    return 'Do you really want to remove this post?';
  }

  static get CHECK_FILTER_VALUE() {
    return 'Please, check your filter value.';
  }

  static get FILTER_USED() {
    return 'You\'ve already used this filter';
  }

  static get REMOVE_POST_LISTENER_TYPE() {
    return 'removePost';
  }

  toggleMessageBox(message, okButtonConfig) {
    this.isShown = !this.isShown;

    if (message) {
      this._message.textContent = message;
    } else {
      this._message.textContent = message;
    }

    if (okButtonConfig) {
      if (this._okButton.classList.contains('hidden')) {
        this._toggleButtons();
      }

      if (okButtonConfig.type === MessageBox.REMOVE_POST_LISTENER_TYPE) {
        this._listenerType = MessageBox.REMOVE_POST_LISTENER_TYPE;

        this._okButton.value = okButtonConfig.id;
        this._okButton.addEventListener('click', event => this._removePostListener(event));
      }
    } else {
      if (!this._okButton.classList.contains('hidden')) {
        this._toggleButtons();

        if (this._listenerType == MessageBox.REMOVE_POST_LISTENER_TYPE) {
          this._listenerType = undefined;

          this._okButton.value = '';
          this._okButton.removeEventListener('click', this._removePostListener);
        }
      }
    }

    this._messageBox.classList.toggle('hidden');
  }

  _toggleButtons() {
     [this._okButton, this._cancelButton].forEach(button => button.classList.toggle('hidden'));
  }

  _removePostListener(event) {
    newsArea.removePost(event.target.value);

    this.toggleMessageBox();
  }
}

const messageBox = new MessageBox();
