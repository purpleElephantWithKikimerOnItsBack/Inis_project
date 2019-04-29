class GeneralInfo {
  constructor() {
    [
      this._followers,
      this._photos,
      this._likes,
    ] = document.getElementById('general-info').querySelectorAll('li');
  }

  setData() {
    const author = document.getElementById('author').textContent;
    const posts = postCollection.filter('author', author);

    this._photos.textContent = `Photos: ${posts.length}`;

    let likes = 0;
    posts.forEach((post) => {
      likes += post.likes.length;
    });
    this._likes.textContent = `Likes: ${likes}`;
  }
}

const generalInfo = new GeneralInfo();
generalInfo.setData();
