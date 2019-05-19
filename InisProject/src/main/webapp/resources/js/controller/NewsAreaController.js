class NewsAreaController {
  constructor() {
    this._pageInitialization();

    document.getElementById('load-more-button').addEventListener('click', (event) => {
      this._loadMoreButtonListener(event);
    });
  }

  async _pageInitialization() {
      const posts = await postCollection.getPage(0, 10, {});
      newsArea.displayPage(posts);
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
    console.log(like);
    console.log(edit);
    console.log(remove);
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

    messageBox.toggleMessageBox(MessageBox.REMOVE_POST, {
      type: MessageBox.REMOVE_POST_LISTENER_TYPE,
        id: postId
    });
  }

  async _loadMoreButtonListener(event) {
    const start = [...document.querySelectorAll('.post')].length;
    const posts = await postCollection.getPage(start, 10, filtersController._filter);
    newsArea.displayPage(posts);
  }
}

const newsAreaController = new NewsAreaController();
