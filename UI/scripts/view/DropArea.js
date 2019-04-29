class DropArea {
  constructor() {
    this._dropArea = document.getElementById('drop-area');

    this._profileArea = document.getElementById('profile-area');

    this._descriptionArea = document.getElementById('description-area');
    this._description = document.getElementById('description');
    this._hashtags = document.getElementById('hashtags');
    [
      this._cancelButton,
      this._addButton,
      this._editButton,
    ] = this._descriptionArea.getElementsByTagName('button');

    this._setStylesOnEvents();
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

  postProcessing(file, postId) {
    this._toggleProfileArea();
    this._toggleDropArea(file);
    this._toggleDescriptionArea(file);
    this._toggleDropAreaButtons(postId);

    if (postId) {
      this._editButton.value = postId;
    }
  }

  _toggleProfileArea() {
    this._profileArea.firstElementChild.classList.toggle('hide-area');
    this._profileArea.classList.toggle('hide-area');

    [...this._profileArea.getElementsByTagName('button')].forEach((button) => {
      button.classList.toggle('opacity-zero-button');
    });
  }

  _toggleDropArea(file) {
    if (file) {
      const image = new Image();
      image.src = `images/${file.name}`;
      image.classList.toggle('add-post-image');

      this._dropArea.firstElementChild.style.display = 'none';
      this._dropArea.classList.toggle('upper-drop-area');

      this._dropArea.appendChild(image);
    } else {
      this._dropArea.removeChild(this._dropArea.getElementsByTagName('img')[0]);
      this._dropArea.firstElementChild.style.display = 'block';

      this._dropArea.classList.toggle('upper-drop-area');
    }
  }

  _toggleDescriptionArea(file) {
    if (!file || !file.description) {
      this._hashtags.value = '';
      this._description.value = '';
    } else {
      this._hashtags.value = file.hashTags;
      this._description.value = file.description;
    }

    this._descriptionArea.classList.toggle('hide-area');
  }

  _toggleDropAreaButtons(postId) {
    this._cancelButton.classList.toggle('hidden');
    if (postId) {
      if (this._editButton.classList.contains('hidden')) {
        this._editButton.classList.toggle('hidden');
      }

      if (!this._addButton.classList.contains('hidden')) {
        this._addButton.classList.toggle('hidden');
      }
    } else {
      if (!this._editButton.classList.contains('hidden')) {
        this._editButton.classList.toggle('hidden');
      } else {
        this._addButton.classList.toggle('hidden');
      }
    }
  }

  getDropArea() {
    return this._dropArea;
  }

  getButtons() {
    return [this._cancelButton, this._addButton, this._editButton];
  }
}

const dropArea = new DropArea();
