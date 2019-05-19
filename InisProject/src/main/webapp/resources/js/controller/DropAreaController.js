class DropAreaController {
  constructor() {
  	this._dropArea = dropArea.getDropArea();
  	this._dropArea.addEventListener('drop', event => this._handleDrop(event));

    [this._cancelButton, this._addButton, this._editButton] = dropArea.getButtons();
    this._cancelButton.addEventListener('click', () => this._onCancelButtonClick());
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
  	  }), false });
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

  async _onAddButtonClick(event) {
      const postId = await postCollection.generateId();

      const descriptionForm = document.getElementById('description');
      const description = descriptionForm.value;
      descriptionForm.value = '';

      const hashTagsForm = document.getElementById('hashtags');
      const hashTags = hashTagsForm.value
          .split('#')
          .filter(hashtag => hashtag.length !== 0);
      hashTagsForm.value = '';

      const imageSrc = this._dropArea.getElementsByTagName('img')[0].src;

      const post = {
          id: postId,
          author: document.getElementById('author').textContent,
          createdAt: new Date(),
          photoLink: imageSrc.substring(imageSrc.lastIndexOf('images')),
          description: description,
          hashTags: hashTags,
          likes: [],
      };

      if (await postCollection.add(post)) {
          newsArea.displayPost(post);
          newsAreaController.setPostListeners(document.querySelector('.post'));

          dropArea.postProcessing();

          this._isDropAvailable = true;
      } else {
          if (!messageBox.isShown) {
              messageBox.toggleMessageBox(MessageBox.CHECK_FIELDS);
              setTimeout(() => messageBox.toggleMessageBox(), 5000);
          }
      }
  }

  async _onEditButtonClick(event) {
    const id = event.target.value;

    const newDescription = document.getElementById('description').value;

    const newHashTags = document.getElementById('hashtags');
    const hashtags = newHashTags.value
      .split('#')
      .filter(hashTag => hashTag.length !== 0);

    const changes = {
        description: newDescription,
        hashTags: hashtags,
        createdAt: new Date(),
    };

    if (await postCollection.edit(id, changes)) {
        const post = await postCollection.get(id);

        newsArea.removePost(id);

        newsArea.displayPost(post);
        newsAreaController.setPostListeners(document.querySelector('.post'));

        dropArea.postProcessing();

        this._isDropAvailable = true;
    } else {
        messageBox.toggleMessageBox(MessageBox.CHECK_FIELDS);
        setTimeout(() => messageBox.toggleMessageBox(), 5000);
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
