const module = (() => {
  function getPhotoPosts(start = 0, count = 10, filter = {}) {
    const posts = photoPosts.filter((post) => {
      if (parseInt(post.id, 10) <= start) {
        return false;
      }

      if (filter.author) {
        if (post.author !== filter.author) {
          return false;
        }
      }

      if (filter.createdAt) {
        const current = filter.createdAt;
        current.setHours(0, 0, 0, 0);

        const next = new Date();
        next.setDate(current.getDate() + 1);
        next.setHours(0, 0, 0, 0);

        if (current > post.createdAt || post.createdAt > next) {
          return false;
        }
      }

      if (filter.hashTags && filter.hashTags.length) {
        return post.hashTags.some(tag => filter.hashTags.includes(tag));
      }
      return true;
    });

    posts.sort((x, y) => x.createdAt.getTime() > y.createdAt.getTime());

    return posts.splice(0, count);
  }


  console.log('getPhotoPosts(start: number, count: number, filter: object):\n');
  console.log(getPhotoPosts());
  console.log(getPhotoPosts(5));
  console.log(getPhotoPosts(5, 3));
  console.log(getPhotoPosts(5, 3, { author: 'kikimer' }));
  console.log(getPhotoPosts(5, 3, { author: '2cupsofrolton' }));
  console.log(getPhotoPosts(5, 4, { author: 'kikimer', hashTags: ['reptiloids', 'supra'] }));
  console.log(getPhotoPosts(4, 6, { createdAt: new Date('2019-03-05T22:01:12') }));


  function getPhotoPost(id) {
    return photoPosts.find(post => post.id === id);
  }


  console.log('---------------------\ngetPhotoPost(id: string) function:\n');
  console.log(getPhotoPost('3'));
  console.log(getPhotoPost('25'));


  function validatePhotoPost(photoPost) {
    const {
      id,
      description,
      createdAt,
      author,
      photoLink,
      hashTags,
      likes,
    } = photoPost;

    if (!id) { return false; }
    if (!description || description.length > 199) { return false; }
    if (!createdAt || !(createdAt instanceof Date)) { return false; }
    if (!author) { return false; }
    if (!photoLink) { return false; }
    if (!hashTags) { return false; }
    if (!likes) { return false; }

    return true;
  }


  console.log('---------------------\nvalidatePhotoPost(post: object) function:\n');
  console.log(validatePhotoPost(photoPosts[0]));
  console.log(validatePhotoPost({
    id: '',
    description: 'this is description',
    author: 'kikimer',
    createdAt: new Date(),
    photoLink: 'this is link',
    hashTags: ['this', 'are', 'hashTags'],
    likes: ['this', 'are', 'people', 'who', 'liked'],
  }));
  console.log(validatePhotoPost({
    id: 1,
    description: 'this is description',
    author: 'kikimer',
    createdAt: new Date(),
    photoLink: 'this is link',
    hashTags: [],
    likes: ['this', 'are', 'people', 'who', 'liked'],
  }));
  console.log(validatePhotoPost({
    id: '1',
    description: '',
    author: 'kikimer',
    createdAt: new Date(),
    photoLink: 'this is link',
    hashTags: ['this', 'are', 'hashTags'],
    likes: ['this', 'are', 'people', 'who', 'liked'],
  }));
  console.log(validatePhotoPost({
    id: '',
    description: 4,
    author: 'kikimer',
    createdAt: new Date(),
    photoLink: 'this is link',
    hashTags: ['this', 'are', 'hashTags'],
    likes: ['this', 'are', 'people', 'who', 'liked'],
  }));
  console.log(validatePhotoPost({
    id: '1',
    description: 'this is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is descriptionthis is description',
    author: 'kikimer',
    createdAt: new Date(),
    photoLink: 'this is link',
    hashTags: ['this', 'are', 'hashTags'],
    likes: ['this', 'are', 'people', 'who', 'liked']
  }));
  console.log(validatePhotoPost({
    id: '1',
    description: 'this is description',
    author: 'kikimer',
    createdAt: 'new Date()',
    photoLink: 'this is link',
    hashTags: '',
    likes: 4,
  }));
  console.log(validatePhotoPost({
    id: '',
    description: 'this is description',
    author: 'kikimer',
    createdAt: new Date(),
    photoLink: 'this is link',
    hashTags: ['this', 'are', 'hashTags'],
    likes: ['this', 'are', 'people', 'who', 'liked'],
  }));


  function addPhotoPost(photoPost) {
    if (!validatePhotoPost(photoPost)) {
      return false;
    }
    photoPosts.push(photoPost);
    return true;
  }


  console.log('---------------------\naddPhotoPost(post: object) function:\n');
  console.log(addPhotoPost({
    id: '21',
    description: 'this is an example for adding this post into the array',
    createdAt: new Date('2019-03-09T22:34:00'),
    author: 'shpillie-willie',
    photoLink: 'images/willie.jpg',
    hashTags: ['sausage', 'bignlong'],
    likes: ['hello', 'willie'],
  }));
  console.log(addPhotoPost({
    id: '',
    description: 'this is an example for adding this post into the array',
    createdAt: new Date('2019-03-09T22:34:00'),
    author: 'shpillie-willie',
    photoLink: 'images/willie.jpg',
    hashTags: [],
    likes: ['hello', 'willie'],
  }));


  function editPhotoPost(id, photoPost) {
    const index = photoPosts.findIndex(post => post.id === id);
    if (index === -1) {
      return false;
    }

    const postCopy = {};
    Object.getOwnPropertyNames(photoPosts[index]).forEach((prop) => {
      postCopy[prop] = photoPosts[index][prop];
    });

    const { description, photoLink, hashTags } = photoPost;

    if (description) {
      postCopy.description = description;
    }
    if (photoLink) {
      postCopy.photoLink = photoLink;
    }
    if (hashTags) {
      postCopy.hashTags = hashTags;
    }

    if (!validatePhotoPost(postCopy)) {
      return false;
    }

    photoPosts[index] = postCopy;
    return true;
  }


  console.log('---------------\nchecking editPhotoPost(id: string, photoPost: object) function:');
  console.log(editPhotoPost('4', { author: 'moron5', description: 'changed' }));
  console.log(getPhotoPost('4'));
  console.log(editPhotoPost('5', {
    author: 'moron5',
    description: 'changed',
    photoLink: 'changed',
    hashTags: ['this', 'are', 'new', 'hashTags'],
    fakeProp: 'none',
  }));
  console.log(getPhotoPost('5'));


  function removePhotoPost(id) {
    const index = photoPosts.findIndex(post => post.id === id);
    if (index === -1) {
      return false;
    }

    photoPosts.splice(index, 1);
    return true;
  }

  console.log(removePhotoPost('7'));
  console.log(photoPosts);
})();
