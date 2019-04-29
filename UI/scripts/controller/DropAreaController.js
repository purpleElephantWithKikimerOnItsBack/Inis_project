class DropAreaController {
  constructor() {
  	this._dropArea = dropArea.getDropArea();
  	this._dropArea.addEventListener('drop', event => this._handleDrop(event));

    [this._cancelButton, this._addButton, this._editButton] = dropArea.getButtons();
    this._cancelButton.addEventListener('click',  () => this._onCancelButtonClick());
    this._addButton.addEventListener('click', event => this._onAddButtonClick(event));
    this._editButton.addEventListener('click', event => this._onEditButtonClick(event));

  	this._isDropAvailable = true;

  	this._preventDefaultBehavior();
  }

  _preventDefaultBehavior() {
  	['dragenter', 'dragleave', 'dragover', 'drop'].forEach((type) => {
  	  this._dropArea.addEventListener(type, event => {
  	  	event.preventDefault();
  	  	event.stopPropagation();
  	  }), false
  	});
  }

   _handleDrop(event) {
    if (this._isDropAvailable) {
      const dt = event.dataTransfer;
      const [file] = dt.files;

      if (file.type.startsWith('image')) {
        this._isDropAvailable = false;

      	dropArea.postProcessing(file);
      }
    }
  }

  _onCancelButtonClick() {
    dropArea.postProcessing();

    if (messageBox.isShown) {
      messageBox.toggleMessageBox();
    }

    this._isDropAvailable = true;
  }

  _onAddButtonClick(event) {
    const postId = postCollection.generateId();

    const descriptionForm = document.getElementById('description');
    const description = descriptionForm.value;
    descriptionForm.value = '';

    const hashTagsForm = document.getElementById('hashtags');
    const hashTags = hashTagsForm.value
      .split('#')
      .filter(hashtag => hashtag.length !== 0);
    hashTagsForm.value = '';

    const post = {
      id: postId,
      author: document.getElementById('author').textContent,
      createdAt: new Date(),
      photoLink: this._dropArea.getElementsByTagName('img')[0].src,
      description: description,
      hashTags: hashTags,
      likes: [],
    };

    if (postCollection.add(post)) {
      newsArea.displayPost(post);
      newsAreaController.setPostListeners(document.querySelector('.post'));

      dropArea.postProcessing();

      this._isDropAvailable = true;
    } else {
      if (!messageBox.isShown) {
        messageBox.toggleMessageBox(MessageBox.CHECK_FIELDS);
      }
    }
  }

  _onEditButtonClick(event) {
    const id = event.target.value;

    const newDescription = document.getElementById('description').value;

    const newHashTags = document.getElementById('hashtags');
    const hashtags = newHashTags.value
      .split('#')
      .filter(hashTag => hashTag.length !== 0);

    if (postCollection.edit(id, { hashTags: hashtags, description: newDescription })) {
      newsArea.removePost(id);
      newsArea.displayPost(postCollection.get(id));

      newsAreaController.setPostListeners(document.querySelector('.post'));

      dropArea.postProcessing();

      this._isDropAvailable = true;
    } else {
      messageBox.toggleMessageBox(MessageBox.CHECK_FIELDS);
    }
  }

  editPost(postInformation, id) {
    if (this._isDropAvailable) {
      this._isDropAvailable = false;

      dropArea.postProcessing(postInformation, id);
    }
  }
}

const dropAreaController = new DropAreaController();
