class GeneralInfo {
  constructor() {
    [this._followers, this._photos, this._likes] = document
      .getElementById('general-info')
      .querySelectorAll('li');
  }

  set() {
    const postAuthor = document.getElementById('author').textContent;

    fetch('photoposts?method=filter', {
      body: `${JSON.stringify({ author: postAuthor })}`,
      method: 'POST',
    }).then(
        (response) => {
          response.text().then((photoPosts) => {
            const posts = JSON.parse(photoPosts);

            this._photos.textContent = `Photos: ${posts.length}`;

            let likes = 0;
            for (let post of posts) {
              likes += post.likes.length;
            }
            this._likes.textContent = `Likes: ${likes}`;
          });
        },
        () => {
          messageBox.toggleMessageBox(MessageBox.GENERAL_INFO_ERROR);
          setTimeout(() => messageBox.toggleMessageBox(), 5000);
        }
    );
  }
}

const generalInfo = new GeneralInfo();
generalInfo.set();
