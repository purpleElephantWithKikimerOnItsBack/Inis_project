class DropArea {
  constructor() {
    this._dropArea = document.getElementById('drop-area');
    this._dropArea.addEventListener('drop', event => this._handleDrop(event), false);

    this._profileArea = document.getElementById('profile-area');

    this._descriptionArea = document.getElementById('description-area');
    this._description = document.getElementById('description');
    this._hashtags = document.getElementById('hashtags');
    [
      this._cancelButton,
      this._addButton,
    ] = this._descriptionArea.getElementsByTagName('button');
    this._addButton.addEventListener('click', event => this.onAddPostButtonClick(event));
    this._cancelButton.addEventListener('click', event => this.onCancelButtonClick(event));

    this._messageBox = messageBox;
    this._isDropAvailable = true;

    this._preventDefaultBehaviour();
    this._setStylesOnEvents();
  }

  _preventDefaultBehaviour() {
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventType) => {
      this._dropArea.addEventListener(eventType, preventDefaults, false);
    });
  }

  _setStylesOnEvents() {
    ['dragenter'].forEach((eventType) => {
      this._dropArea.addEventListener(eventType, () => {
        this._dropArea.classList.toggle('highlight-droparea');
      }, false);
    });

    ['dragleave', 'drop'].forEach((eventType) => {
      this._dropArea.addEventListener(eventType, () => {
        this._dropArea.classList.toggle('highlight-droparea');
      }, false);
    });
  }

  _handleDrop(event) {
    if (this._isDropAvailable) {
      this._isDropAvailable = false;

      const dt = event.dataTransfer;
      const files = [...dt.files];

      files.filter(file => file.type.startsWith('image'))
        .forEach(file => this._startPostCreation(file));
    }
  }

  _startPostCreation(file, buttonValue) {
    this._changeProfileArea();
    this._changeDropArea(file);
    this._showDescriptionArea();
    this._showDropAreaButtons(buttonValue);
  }

  _changeProfileArea() {
    this._profileArea.firstElementChild.classList.toggle('hide-area');
    this._profileArea.classList.toggle('hide-area');

    [...this._profileArea.getElementsByTagName('button')].forEach((button) => {
      button.classList.toggle('opacity-zero-button');
    });
  }

  _changeDropArea(file) {
    const image = new Image();
    image.src = `images/${file.name}`;
    image.classList.toggle('add-post-image');

    this._dropArea.firstElementChild.style.display = 'none';
    this._dropArea.classList.toggle('upper-drop-area');

    this._dropArea.appendChild(image);
  }

  _showDescriptionArea() {
    this._descriptionArea.classList.toggle('hide-area');
  }

  _showDropAreaButtons(buttonValue) {
    const buttons = [...this._descriptionArea.getElementsByTagName('button')];
    buttons.forEach((button) => {
      button.classList.toggle('hidden');
    });

    if (buttonValue) {
      buttons[1].value = buttonValue;
    }
  }

  _cancelPostCreation() {
    this._isDropAvailable = true;

    this._hideDropAreaButtons();
    this._hideDescriptionArea();
    this._returnDropArea();
    this._changeProfileArea();
  }

  _hideDropAreaButtons() {
    [...this._descriptionArea.getElementsByTagName('button')].forEach((button) => {
      button.classList.toggle('hidden');
    });
  }

  _hideDescriptionArea() {
    this._descriptionArea.classList.toggle('hide-area');
    this._hashtags.value = '';
    this._description.value = '';
  }

  _returnDropArea() {
    this._dropArea.removeChild(this._dropArea.getElementsByTagName('img')[0]);
    this._dropArea.firstElementChild.style.display = 'block';

    this._dropArea.classList.toggle('upper-drop-area');
  }

  onCancelButtonClick(event) {
    this._cancelPostCreation();
    this._messageBox.hideErrorMessage();

    event.target.nextElementSibling.value = '';
  }

  onAddPostButtonClick(event) {
    const postId = postCollection.generateId();

    const descriptionField = document.getElementById('description');
    const descriptionValue = descriptionField.value;
    descriptionField.value = '';

    const hashTagsField = document.getElementById('hashtags');
    const hashTagsArr = hashTagsField.value
      .split('#')
      .filter(hashtag => hashtag.length !== 0);
    hashTagsField.value = '';

    const post = {
      id: postId,
      author: document.getElementById('author').textContent,
      createdAt: new Date(),
      photoLink: this._dropArea.getElementsByTagName('img')[0].src,
      description: descriptionValue,
      hashTags: hashTagsArr,
      likes: [],
    };

    if (postCollection.add(post)) {
      newsArea.displayPost(post);
      this._cancelPostCreation();
      this._messageBox.hideErrorMessage();

      if (event.target.value) {
        newsArea.removePost(event);
        event.target.value = '';
      }
    } else {
      this._messageBox.showErrorMessage('Something went wrong with post creation. Please, check the description'
        + ' and hashtags fields.', false, null);
    }
  }

  editPost(event) {
    if (this._isDropAvailable) {
      this._isDropAvailable = false;

      let fileName = event.target
        .parentElement
        .parentElement
        .querySelector('img')
        .src;
      fileName = fileName.substring(fileName.lastIndexOf('/') + 1);

      this._startPostCreation({ name: fileName }, event.target.offsetParent.id);
    }
  }
}

const dropArea = new DropArea();
