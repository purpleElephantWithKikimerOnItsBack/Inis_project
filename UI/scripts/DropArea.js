class DropArea {
  constructor() {
    this._dropArea = document.getElementById('drop-area');
    this._dropArea.addEventListener('drop', e => this._handleDrop(e), false);

    this._profileArea = document.getElementById('profile-area');
    this._descriptionArea = document.getElementById('description-area');
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
    ['dragenter', 'dragover'].forEach((eventType) => {
      this._dropArea.addEventListener(eventType, () => this._dropArea.style.background = '#3B3B6D', false);
    });

    ['dragleave', 'drop'].forEach((eventType) => {
      this._dropArea.addEventListener(eventType, () => this._dropArea.style.background = '', false);
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
    this._hideProfileArea();
    this._changeDropArea(file);
    this._showDescriptionArea();
    this._showDropAreaButtons(buttonValue);
  }

  _hideProfileArea() {
    const image = this._profileArea.firstElementChild;
    const buttons = [...this._profileArea.getElementsByTagName('button')];

    buttons[0].style.opacity = '0';
    buttons[1].style.opacity = '0';

    image.style.height = '0px';
    image.style.opacity = '0';

    this._profileArea.style.height = '0px';
    this._profileArea.style.opacity = '0';
  }

  _changeDropArea(file) {
    const image = new Image();
    image.src = `images/${file.name}`;
    image.id = 'add-post-image';
    image.height = this._dropArea.offsetHeight;
    image.width = this._dropArea.offsetWidth;
    image.style.boxShadow = '0 0 10px rgba(0,0,0,0.6)';
    image.style.transition = '2s';
    image.style.visibility = 'visible';

    this._dropArea.style.top = '0px';
    this._dropArea.firstElementChild.style.display = 'none';
    this._dropArea.style.transition = '0.7s, visibility 0s';
    this._dropArea.style.visibility = 'hidden';
    this._dropArea.appendChild(image);
  }

  _showDescriptionArea() {
    this._descriptionArea.style.top = '220px';
    this._descriptionArea.style.opacity = '1';
  }

  _showDropAreaButtons(buttonValue) {
    const buttons = [...this._descriptionArea.getElementsByTagName('button')];

    buttons[0].style.visibility = 'visible';
    buttons[1].style.visibility = 'visible';

    if (buttonValue) {
      buttons[1].value = buttonValue;
    }
  }

  _cancelPostCreation() {
    this._isDropAvailable = true;

    this._hideDropAreaButtons();
    this._hideDescriptionArea();
    this._returnDropArea();
    this._returnProfileArea();
  }

  _hideDropAreaButtons() {
    const buttons = [...this._descriptionArea.getElementsByTagName('button')];

    buttons[0].style.visibility = 'hidden';
    buttons[1].style.visibility = 'hidden';
  }

  _hideDescriptionArea() {
    this._descriptionArea.style.opacity = '0';
  }

  _returnDropArea() {
    this._dropArea.removeChild(this._dropArea.getElementsByTagName('img')[0]);
    this._dropArea.style.top = '326px';
    this._dropArea.firstElementChild.style.display = 'block';
    this._dropArea.style.transition = '1s, visibility 0s';
    this._dropArea.style.visibility = 'visible';
  }

  _returnProfileArea() {
    const image = this._profileArea.firstElementChild;
    const buttons = [...this._profileArea.getElementsByTagName('button')];

    buttons[0].style.opacity = '1';
    buttons[1].style.opacity = '1';

    image.style.height = '250px';
    image.style.opacity = '1';

    this._profileArea.style.height = '316px';
    this._profileArea.style.opacity = '1';
  }

  onCancelButtonClick(event) {
    console.log(event);
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
    let fileName = event.target.offsetParent
      .previousElementSibling
      .previousElementSibling
      .src;
    fileName = fileName.substring(fileName.lastIndexOf('/') + 1);

    this._startPostCreation({ name: fileName }, event.target.offsetParent.id);
  }
}

const dropArea = new DropArea();
