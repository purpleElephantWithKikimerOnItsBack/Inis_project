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

    this._loadMoreButton = document.getElementById('load-more-button');
    this._loadMoreButton.addEventListener('click', event => this._loadMore(event));
  }

  _buildPostHTML(post) {
    const postItem = this._postTemplate.content.firstElementChild;
    postItem.id = post.id;

    const image = this._postTemplate.content.querySelector('img');
    image.src = post.photoLink;

    this._postTemplate.content.querySelector('.post-description')
      .textContent = `description: ${post.description}`;

    this._likeButton.id = `${post.id}.like-button`;
    this._likeButton.value = '0';

    const listItems = this._postTemplate.content.querySelectorAll('.underphoto-text li');
    listItems[0].textContent = `${post.createdAt.toLocaleDateString()}: ${post.author}`;
    listItems[1].textContent = `#${post.hashTags.join('#')}`;

    const node = document.importNode(this._postTemplate.content, true);
    const nodePhotoContainer = node.querySelector('.photo-container');
    if (loggedIn && post.author === this._author) {
      this._buttons.forEach((button) => {
        button.id = `${post.id}.${button.classList[0]}`;
      });

      nodePhotoContainer
        .appendChild(document.importNode(this._buttonsTemplate.content, true));
    }

    node.querySelector('img').addEventListener('click', event => showPostDescription(event));

    if (!loggedIn) {
      node.querySelector('.photo-container')
        .removeChild(node.getElementById(`${this._likeButton.id}`));
    }

    return node;
  }

  displayPage(start, count, filter) {
    const posts = this._postCollection.getPage(start, count, filter);

    if (posts.length) {
      const container = document.createElement('div');
      container.classList.toggle('posts-component');

      posts.forEach((post) => {
        container.appendChild(this._buildPostHTML(post));
      });

      this._postList.append(container);

      if(!this._postCollection.getPage(posts[posts.length - 1].id, count, filter).length) {
        this._loadMoreButton.classList.toggle('nondisplay');
      } else if (this._loadMoreButton.classList.contains('nondisplay')) {
        this._loadMoreButton.classList.toggle('nondisplay');
      }
    }
  }

  reloadPage(start, count, filter) {
    [...this._postList.getElementsByClassName('posts-component')].forEach((component) => {
      this._postList.removeChild(component);
    });

    this.displayPage(start, count, filter);
  }

  displayPost(post) {
    const container = document.createElement('div');
    container.classList.toggle('posts-component');

    container.appendChild(this._buildPostHTML(post));
    this._postList.append(container);
  }

  _loadMore(event) {
    this.displayPage(this._postList.lastElementChild.lastElementChild.id,
      10, filterArea.filter);
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

function likePost(event) {
  const button = document.getElementById(`${event.target.id}`);
  button.classList.toggle('liked');
  button.classList.toggle('opacity');
}

function showPostDescription(event) {
  event.target.parentElement.querySelector('.post-description-area')
    .classList.toggle('hidden');
}

const newsArea = new NewsArea(postCollection);
newsArea.displayPage(1);
