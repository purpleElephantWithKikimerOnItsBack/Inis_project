class NewsArea {
  constructor() {
    this._postTemplate = document.getElementById('posttemplate');

    this._buttonsTemplate = document.getElementById('edit-remove-buttons');

    this._postList = document.querySelector('.posts');
    this._author = document.getElementById('author').textContent;
  }

  _buildPostHTML(post) {
    const postItem = this._postTemplate.content.firstElementChild;
    postItem.id = post.id;

    this._postTemplate.content.querySelector('img').src = `resources/${post.photoLink}`;

    this._postTemplate.content.querySelector('.post-description')
      .textContent = `description: ${post.description}`;

    const listItems = this._postTemplate.content.querySelectorAll('.underphoto-text li');
    listItems[0].textContent = `${(new Date(post.createdAt)).toLocaleDateString()}: ${post.author}`;
    listItems[1].textContent = `#${post.hashTags.join('#')}`;

    const node = document.importNode(this._postTemplate.content, true);
    if (post.likes.includes(this._author)) {
      const likeButton = node.querySelector('.like-button');
      likeButton.classList.toggle('liked');
      likeButton.classList.toggle('opacity');
    }

    const nodePhotoContainer = node.querySelector('.photo-container');
    if (post.author === this._author) {
      nodePhotoContainer
        .appendChild(document.importNode(this._buttonsTemplate.content, true));
    }

    return node;
  }

  displayPage(posts) {
    const container = document.createElement('div');
    container.classList.toggle('posts-component');

    posts.forEach((post) => {
      container.appendChild(this._buildPostHTML(post));
    });

    [...container.querySelectorAll('.post')]
      .forEach(post => newsAreaController.setPostListeners(post));

    this._postList.append(container);
  }

  displayPost(post) {
    const container = document.createElement('div');
    container.classList.toggle('posts-component');
    container.appendChild(this._buildPostHTML(post));

    newsAreaController.setPostListeners(container.querySelector('.post'));

    this._postList.insertBefore(container, this._postList.firstElementChild);
  }

  reloadPage(posts) {
    [...this._postList.getElementsByClassName('posts-component')].forEach((component) => {
      this._postList.removeChild(component);
    });

    this.displayPage(posts);
  }

  removePost(id) {
    document.getElementById(id).remove();
  }
}


const newsArea = new NewsArea();
