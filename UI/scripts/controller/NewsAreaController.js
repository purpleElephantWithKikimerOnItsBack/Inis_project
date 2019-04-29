class NewsAreaController {
  constructor() {
    newsArea.displayPage(this.acquirePage(0, 10));

    [...document.querySelectorAll('.post')].forEach(post => this.setPostListeners(post));
  }

  acquirePage(start, count ,filter) {
    return postCollection.getPage(start, count ,filter);
  }

  getButtons(post, className) {
    return [...post.querySelectorAll(className)];
  }

  setListener(listener, button) {
    button.addEventListener('click', event => listener(event));
  }

  setPostListeners(post) {
    const [like] = this.getButtons(post, '.like-button');
    const [edit] = this.getButtons(post, '.edit-button');
    const [remove] = this.getButtons(post, '.remove-button');

    if (like) {
      this.setListener(this._likeButtonListener, like);
    }
    if (edit) {
      this.setListener(this._editButtonListener, edit);
    }
    if (remove) {
      this.setListener(this._removeButtonListener, remove);
    }
  }

  _likeButtonListener(event) {
  	event.target.classList.toggle('liked');
  	event.target.classList.toggle('opacity');
  }

  _editButtonListener(event) {
  	const id = event
      .target
      .parentElement
      .parentElement
      .parentElement
      .id;

    const name = event
      .target
      .parentElement
      .parentElement
      .firstElementChild
      .src;

    const post = document.getElementById(id);

    const postInformation = {
      'name': name.substring(name.lastIndexOf('/') + 1),
      'description': post.querySelector('.post-description').textContent,
      'hashTags': post.querySelector('.post-hashtags').textContent,
    };

    dropAreaController.editPost(postInformation, id);
  }

  _removeButtonListener(event) {
    const postId = event
      .target
      .parentElement
      .parentElement
      .parentElement
      .id;

    messageBox.toggleMessageBox(MessageBox.REMOVE_POST, { type: MessageBox.REMOVE_POST_LISTENER_TYPE, id: postId });
  }
}

const newsAreaController = new NewsAreaController();
