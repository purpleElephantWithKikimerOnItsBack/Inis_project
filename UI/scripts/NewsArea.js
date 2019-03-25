class NewsArea {
  constructor(postCollection) {
    this._postCollection = postCollection;
    this._postTemplate = document.getElementById('posttemplate');

    this._buttonsTemplate = document.getElementById('edit-remove-buttons');
    this._buttons = [...this._buttonsTemplate.content.querySelectorAll('button')];
    this._likeButton = this._postTemplate.content.querySelector('.like-button');

    this._postList = document.querySelector('.posts');
    this._author = document.getElementById('author').textContent;

    this._messageBox = messageBox;
  }

  _buildPostHTML(post) {
    const postItem = this._postTemplate.content.firstElementChild;
    postItem.id = post.id;

    const image = this._postTemplate.content.querySelector('img');
    image.src = post.photoLink;

    this._likeButton.id = `${post.id}.like-button`;
    this._likeButton.value = '0';

    const listItems = this._postTemplate.content.querySelectorAll('.underphoto-text li');
    listItems[0].textContent = `${post.createdAt.toLocaleDateString()}: ${post.author}`;
    listItems[1].textContent = `#${post.hashTags.join('#')}`;

    const node = document.importNode(this._postTemplate.content, true);
    if (post.author === this._author) {
      this._buttons.forEach(button => button.id = `${post.id + '.' + button.classList[0]}`);
      node.querySelector('.photo-container')
        .appendChild(document.importNode(this._buttonsTemplate.content, true));
    }

    return node;
  }

  displayPage(start, count, filter) {
    const posts = this._postCollection.getPage(start, count, filter);
    const container = document.createElement('div');

    posts.forEach((post) => {
      container.appendChild(this._buildPostHTML(post));
    });

    this._postList.append(container);
  }

  displayPost(post) {
    this._postList.append(this._buildPostHTML(post));
  }

  loadMore() {
    this.displayPage(this._postTemplate.content.querySelector('li').id);
  }

  likePost(event) {
    const button = document.getElementById(`${event.target.id}`);

    if (button.value === '0') {
      button.value = '1';
      button.classList.remove('opacity');
      button.style.background = '#EC3B83';
      button.style.borderColor = '#EC3B83';
    } else {
      button.value = '0';
      button.classList.add('opacity');
      button.style.background = '#FA6E79';
      button.style.borderColor = '#FA6E79';
    }
  }

  checkRemoval(event) {
    this._messageBox.showErrorMessage('Do you really want to delete this post?', true, event);
  }

  removePost(event) {
    const post = document.getElementById(`${event.target.value.split('.')[0]}`);
    post.parentElement.removeChild(post);
    this._messageBox.hideErrorMessage();
  }
}

const newsArea = new NewsArea(postCollection);
newsArea.displayPage(15, 4);
