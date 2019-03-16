(function() {
  function getPhotoPosts(start=0, count=10, filter={}) {
    let posts = photoPosts.filter(function(post) {
      if (filter.author) {
        if (post.author !== filter.author) {
          return false;
        }
      }

      if (filter.createdAt) {
        let current = filter.createdAt;
        current.setHours(0, 0, 0, 0);

        let next = new Date();
        next.setDate(current.getDate() + 1);
        next.setHours(0, 0, 0, 0);

        if (current > post.createdAt || post.createdAt > next) {
          return false;
        }
      }

      if (filter.hashTags && filter.hashTags.length) {
        return post.hashTags.some(function(tag) {
          return filter.hashTags.includes(tag);
        });
      }
      return true;
    });

    posts.sort(function(x, y) {
      return x.createdAt.getTime() > y.createdAt.getTime();
    });

    posts = posts.splice(start, count);

    return posts;
  }

  console.log( getPhotoPosts(3, 5) );
})();


//   // console.log('checking \'getPhotoPosts(start: number, count: number, filter: object)\' function:');

//   // console.log('getPhotoPosts():');
//   // console.log( getPhotoPosts() );

//   // console.log('getPhotoPosts(5):');
//   // console.log( getPhotoPosts(5) );

//   // console.log('getPhotoPosts(\'5\'):');
//   // console.log( getPhotoPosts('5') );

//   // console.log('getPhotoPosts(5, 3):');
//   // console.log( getPhotoPosts(5, 3) );

//   // console.log('getPhotoPosts(5, \'3\'):');
//   // console.log( getPhotoPosts(5, '3') );

//   // console.log('getPhotoPosts(5, 3, { author: \'kikimer\' }):');
//   // console.log( getPhotoPosts(5, 3, { author: 'kikimer' }) );

//   // console.log('getPhotoPosts(5, 3, { author: \'2cupsofrolton\' }):');
//   // console.log( getPhotoPosts(5, 3, { author: '2cupsofrolton' }) );

//   // console.log('getPhotoPosts(5, 3, { person: \'kikimer\' }):');
//   // console.log( getPhotoPosts(5, 3, { person: 'kikimer' }) );

//   // console.log('getPhotoPosts(5, 3, \'object\'):');
//   // console.log( getPhotoPosts(5, 3, 'object') );

//   // console.log('getPhotoPosts(5, 4, { author: \'kikimer\', hashTags: [\'reptiloids\', \'supra\'] })');
//   // console.log( getPhotoPosts(5, 4, { author: 'kikimer', hashTags: ['reptiloids', 'supra'] }) );

//   // console.log('getPhotoPosts(5, 6, { createdAt: new Date(\'2019-03-05\') })');
//   // console.log( getPhotoPosts(5, 6, { createdAt: new Date('2019-03-05') }) );


//   function getPhotoPost(id) {
//     return photoPosts.find((photoPost) => photoPost.id === id);
//   }


//   console.log('---------------');
//   console.log('\nchecking getPhotoPost(id: string) function:');
//   console.log('getPhotoPost(\'3\'):');
//   console.log( getPhotoPost('3') );

//   console.log('getPhotoPost(3):');
//   console.log( getPhotoPost(3) );

//   console.log('getPhotoPost(\'25\'):');
//   console.log( getPhotoPost('25') );
  

//   function validatePhotoPost(photoPost) {
//     if (!photoPost) {
//       return null;
//     }
//     const { id, description, createdAt, author, photoLink, hashTag, likes } = photoPost;

//     // if (!('id' in photoPost) || (typeof photoPost.id !== 'string') || 
//     //       (photoPost.id.length === 0) || 
//     //     !('description' in photoPost) || (typeof photoPost.description !== 'string') ||
//     //       (photoPost.description.length > 199) ||
//     //     !('createdAt' in photoPost) || !(photoPost.createdAt instanceof Date) ||
//     //     !('author' in photoPost) || (typeof photoPost.author !== 'string') ||
//     //       (photoPost.author.length === 0) ||
//     //     !('photoLink' in photoPost) || (typeof photoPost.photoLink !== 'string') ||
//     //       (photoPost.photoLink.length === 0) ||
//     //     !('hashTags' in photoPost) || !(photoPost.hashTags instanceof Array) ||
//     //     !('likes' in photoPost) || !(photoPost.likes instanceof Array)) {
//     //   return false;
//     // }

//     photoPost.hashTags = photoPost.hashTags.filter(function(hashTag) {
//       return typeof hashTag === 'string';
//     });
//     photoPost.likes = photoPost.likes.filter(function(like) {
//       return typeof like === 'string';
//     });

//     return true;
//   }


//   console.log('---------------');
//   console.log('\nchecking validatePhotoPost(photoPost: object) function:');
//   console.log('validatePhotoPost({}):');
//   console.log( validatePhotoPost({}) );

//   console.log('validatePhotoPost(photoPosts[0]):');
//   console.log( validatePhotoPost(photoPosts[0]) );

//   console.log('delete(photoPosts[0].author);\nvalidatePhotoPost(photoPosts[0]):');
//   delete(photoPosts[0].author);
//   console.log( validatePhotoPost(photoPosts[0]) );

//   console.log('photoPost[1].id = 1\nvalidatePhotoPost(photoPost[1]):');
//   photoPosts[1].id = 1;
//   console.log( validatePhotoPost(photoPosts[1]) );


//   function addPhotoPost(photoPost) {
//     if (!validatePhotoPost(photoPost)) {
//       return false;
//     }
//     photoPosts.push(photoPost);
//     return true;
//   }


//   console.log('---------------');
//   console.log('checking addPhotoPost(photoPost: object) function:');
//   console.log('addPhotoPost({}):');
//   console.log( addPhotoPost({}) );

//   let post = {
//     id: '21',
//     description: 'this is an example for adding this post into the array',
//     createdAt: new Date('2019-03-09T22:34:00'),
//     author: 'shpillie-willie',
//     photoLink: 'images/willie.jpg',
//     hashTags: ['sausage', 'bignlong'],
//     likes: ['hello', 'willie'],
//   };
//   console.log('addPhotoPost({'
//     + 'id: \'21\','
//     + 'description: \'this is an example for adding this post into the array\','
//     + 'createdAt: new Date(\'2019-03-09T22:34:00\'),'
//     + 'author: \'shpillie-willie\','
//     + 'photoLink: \'images/willie.jpg\','
//     + 'hashTags: [\'sausage\', \'bignlong\'],'
//     + 'likes: [\'hello\', \'willie\'],'
//     + '}\'):');
//   console.log( addPhotoPost(post) );
  
//   console.log('delete(post.author)\naddPhotoPost(post)');
//   delete(post.author);
//   console.log( addPhotoPost(post) );


//   function editPhotoPost(id, photoPost) {
//     if (typeof id !== 'string' || typeof photoPost !== 'object' ||
//         photoPost === null || photoPost === undefined) {
//       return false;
//     }

//     let post = getPhotoPost(id);
//     if (post === undefined) {
//       return false;
//     }



//     if (!validatePhotoPost(toCheck)) {
//       return false;
//     }

//     if (hasDescription) {
//       post.description = toCheck.description;
//     }
//     if (hasPhotoLink) {
//       post.photoLink = toCheck.photoLink;
//     }
//     if (hasHashTags) {
//       post.hashTags = toCheck.hashTags;
//     }

//     return true;
//   }


//   console.log('---------------');
//   console.log('checking editPhotoPost(id: string, photoPost: object) function:');
//   console.log('getPhotoPost(\'4\'):');
//   console.log( getPhotoPost('4') );
//   console.log('editPhotoPost(\'4\', { author: \'moron5\', description: \'changed\' })');
//   console.log( editPhotoPost('4', { author: 'moron5', description: 'changed' }));
//   console.log( getPhotoPost('4') );

//   console.log('getPhotoPost(\'100500\')');
//   console.log( getPhotoPost('100500') );
//   console.log('editPhotoPost(\'100500\', { author: \'moron5\', description: \'changed\' })');
//   console.log( editPhotoPost('100500', { author: 'moron5', description: 'changed' }) );

//   console.log('getPhotoPost(\'5\')');
//   console.log( getPhotoPost('5') );
//   console.log('editPhotoPost(\'5\', { author: \'moron5\', description: \'changed\', photoLink: \'changed\','
//     + ' hashTags: [\'this\', \'are\', \'new\', \'hashTags\', 15, null] })');
//   console.log( editPhotoPost('5', { author: 'moron5', description: 'changed', photoLink: 'changed',
//                                     hashTags: ['this', 'are', 'new', 'hashTags', 15, null] , fakeProp: 'none' }) );
//   console.log( getPhotoPost('5') );


//   function removePhotoPost(id) {
//     let post = getPhotoPost(id);
//     if (post === undefined || post === null) {
//       return false;
//     }

//     for (let i = 0; i < photoPosts.length; i++) {
//       if (photoPosts[i].id === id) {
//         photoPosts.splice(i, 1);
//         return true;
//       }
//     }

//     return false;
//   }


//   console.log('---------------');
//   console.log('checking removePhotoPost(id: string) function:');
//   console.log('removePhotoPost(\'7\'):');
//   console.log( removePhotoPost('7') );
//   console.log(photoPosts);
// }());