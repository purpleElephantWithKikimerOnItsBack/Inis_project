;(function() {

  let photoPosts = [
    {
      id: '1',
      description: 'this is alien. he\'s flying. i want same things',
      createdAt: new Date('2019-03-05'),
      author: 'kikimer',
      photoLink: 'images/alien.jpg',
      hashTags: ['alien', 'space', 'absolutechill'],
      likes: ['alienlover'],
    },
    {
      id: '2',
      description: 'more aliens. they\'re cool',
      createdAt: new Date('2019-03-05'),
      author: 'kikimer',
      photoLink: 'images/aliens.jpg',
      hashTags: ['alien', 'morealiens', 'halfinvisible', 'absolutechill'],
      likes: ['alienlover1', 'alienlover2'],
    },
    {
      id: '3',
      description: 'hell idk what the F is it. crazy girls',
      createdAt: new Date('2019-03-05'),
      author: 'kikimer',
      photoLink: 'images/bubble.jpg',
      hashTags: ['flygirlfly', 'bubble', 'senseless'],
      likes: ['one', 'two', 'three'],
    },
    {
      id: '4',
      description: 'whale in the air. i like it',
      createdAt: new Date('2019-03-05'),
      author: 'kikimer',
      photoLink: 'images/whale.jpg',
      hashTags: ['whale', 'air', 'smallgirlmmmnice'],
      likes: ['friendOne', 'friendTwo', 'friendThree', 'ohIronic', 'iHaveNoFriends'],
    },
    {
      id: '5',
      description: 'man i really don\'t know what is it. it\'s mental',
      createdAt: new Date('2019-03-05'),
      author: 'kikimer',
      photoLink: 'images/girl_on_bicycle.jpg',
      hashTags: ['idk', 'hellwhatisit'],
      likes: [],
    },
    {
      id: '6',
      description: 'reptiloids yeah. perfect world.',
      createdAt: new Date('2019-03-05'),
      author: 'kikimer',
      photoLink: 'images/reptiloids.jpg',
      hashTags: ['reptiloids', 'imaginaryandperfect', 'awesome'],
      likes: ['reptiloidman', 'reptiloidwoman'],
    },
    {
      id: '7',
      description: 'pure spaceman. hope he\'s fine',
      createdAt: new Date('2019-03-07'),
      author: '2cupsofrolton',
      photoLink: 'images/spaceman.jpg',
      hashTags: ['spaceman', 'hopenotdead', 'helpthispureguy', 'callambulance'],
      likes: ['funeralCeremony'],
    },
    {
      id: '8',
      description: 'flying mechas. and a lady. maybe made of flesh. who knows.',
      createdAt: new Date('2019-03-05'),
      author: 'kikimer',
      photoLink: 'images/mecha.jpg',
      hashTags: ['supra', 'bird', 'fleshgirl'],
      likes: [],
    },
    {
      id: '9',
      description: 'birdman. looks nice. he\s awesome and he can fly. not many of you can.',
      createdAt: new Date('2019-03-05'),
      author: 'kikimer',
      photoLink: 'images/birdman.jpg',
      hashTags: ['birdman', 'absolutebeauty', 'feathers'],
      likes: ['birdiesFamily'],
    },
    {
      id: '10',
      description: 'dolphin-man? dolphin-woman? nobody know. luckily.',
      createdAt: new Date('2019-03-06'),
      author: 'kikimer',
      photoLink: 'images/dolphin.jpg',
      hashTags: ['halfdolphin', 'halfhuman', 'sea'],
      likes: [],
    },
    {
      id: '11',
      description: 'man is buying some stuff. why not.',
      createdAt: new Date('2019-03-10'),
      author: 'andy',
      photoLink: 'images/shopping.jpg',
      hashTags: ['hollyshit', 'hisheadinhispalm', 'nothingtoworryabout'],
      likes: ['Rublevsky', 'Evroopt'],
    },
    {
      id: '12',
      description: 'maybe it\'s the reality',
      createdAt: new Date('2019-03-10'),
      author: 'christopher',
      photoLink: 'images/alien_chilling.jpg',
      hashTags: ['alien', 'spaceman', 'lilsad'],
      likes: ['alienlover1', 'alienlover2', 'alienlover3'],
    },
    {
      id: '13',
      description: 'love to go outside on sunday mornings',
      createdAt: new Date('2019-03-11'),
      author: 'jhoanna',
      photoLink: 'images/planet_walking.jpg',
      hashTags: ['space', 'planetunderthefoot', 'walkingday'],
      likes: ['jupiter', 'saturn', 'earth'],
    },
    {
      id: '14',
      description: 'kinda creepy',
      createdAt: new Date('2019-03-12'),
      author: 'jon',
      photoLink: 'images/my_friends_aliens.jpg',
      hashTags: ['nicefaces', 'morealiens'],
      likes: ['alienlover1488'],
    },
    {
      id: '15',
      description: 'yee haw',
      createdAt: new Date('2019-03-12'),
      author: 'alcoholic',
      photoLink: 'images/why_not.jpg',
      hashTags: ['thatsinteresting', 'tryingfirsttime'],
      likes: ['nicetry'],
    },
    {
      id: '16',
      description: 'another picture of aliens making smth weird.',
      createdAt: new Date('2019-03-12'),
      author: 'kikimer',
      photoLink: 'images/pretty_f_awesome.jpg',
      hashTags: ['reptiloids', 'imaginaryandperfect', 'awesome'],
      likes: ['horsehunter', 'misanthrope'],
    },
    {
      id: '17',
      description: 'going craaaaazyyy',
      createdAt: new Date('2019-03-13'),
      author: 'kikimer',
      photoLink: 'images/its_me.jpg',
      hashTags: ['me', 'myself', 'and', 'i'],
      likes: ['wannadie'],
    },
    {
      id: '18',
      description: 'looks beautiful. men can fly.',
      createdAt: new Date('2019-03-13'),
      author: 'jhonny',
      photoLink: 'images/death_playing.jpg',
      hashTags: ['deathitself', 'flyingman', 'theendofhopes'],
      likes: ['literallyeveryone'],
    },
    {
      id: '19',
      description: 'tshhhh, dont cry. you will not escape your destiny',
      createdAt: new Date('2019-03-13'),
      author: 'kikimer',
      photoLink: 'images/keep_going.jpg',
      hashTags: ['thatsit', 'lastphotoofher', 'goodbyeprettywoman'],
      likes: ['goesdownthestreetpreetywoman'],
    },
    {
      id: '20',
      description: 'marvellous view from here',
      createdAt: new Date('2019-03-14'),
      author: 'kikimer',
      photoLink: 'images/yeah_lets_have_a_fun_time.jpg',
      hashTags: ['earth', 'chill'],
      likes: ['flatyearthcommunity'],
    },
  ];
  
  
  function getPhotoPosts(start=0, count=10, filter=null) {
    if (typeof start !== 'number' || typeof count !== 'number' || typeof filter !== 'object') {
      return null;
    }
    if (start < 0 || start >= photoPosts.length) {
      return null;
    }
    
    let hasAuthor = false;
    let hasCreatedAt = false;
    let hasHashTags = false;
    if (filter !== null) {
      hasAuthor = ('author' in filter && typeof filter['author'] === 'string') ? true : false;
      hasCreatedAt = ('createdAt' in filter && filter['createdAt'] instanceof Date) ? true : false;
      hasHashTags = ('hashTags' in filter && filter['hashTags'] instanceof Array) ? true : false;
      if (hasHashTags) {
        filter['hashTags'] = filter['hashTags'].filter(function(hashTag) {
          return typeof hashTag === 'string';
        });
      }
    } 
    
    let posts = [];
    for (let i = start; (i < photoPosts.length) && (count > 0); i++, count--) {
      let toAdd = true;
      if (toAdd && hasAuthor) {
        toAdd = (photoPosts[i].author === filter.author) ? true : false;
      }
      if (toAdd && hasCreatedAt) {
        toAdd = (photoPosts[i].createdAt.getTime() === filter.createdAt.getTime()) ? true : false;
      }
      if (toAdd && hasHashTags) {
        let found = false;
        for (let j = 0; j < filter.hashTags.length; j++) {
          if (photoPosts[i].hashTags.includes(filter.hashTags[j])) {
            found = true;
            break;
          }
        }
        
        toAdd = found;
      }

      if (toAdd) {
        posts.push(photoPosts[i]);
      }
    }
    
    if (!hasCreatedAt) {
      posts.sort(function(x, y) {
        return x.createdAt > y.createdAt ? 1 : x.createdAt < y.createdAt ? -1 : 0;
      });
    }
  
    return posts;
  }

  
  console.log('checking \'getPhotoPosts(start: number, count: number, filter: object)\' function:');

  console.log('getPhotoPosts():');
  console.log( getPhotoPosts() );

  console.log('getPhotoPosts(5):');
  console.log( getPhotoPosts(5) );

  console.log('getPhotoPosts(\'5\'):');
  console.log( getPhotoPosts('5') );

  console.log('getPhotoPosts(5, 3):');
  console.log( getPhotoPosts(5, 3) );

  console.log('getPhotoPosts(5, \'3\'):');
  console.log( getPhotoPosts(5, '3') );

  console.log('getPhotoPosts(5, 3, { author: \'kikimer\' }):');
  console.log( getPhotoPosts(5, 3, { author: 'kikimer' }) );

  console.log('getPhotoPosts(5, 3, { author: \'2cupsofrolton\' }):');
  console.log( getPhotoPosts(5, 3, { author: '2cupsofrolton' }) );

  console.log('getPhotoPosts(5, 3, { person: \'kikimer\' }):');
  console.log( getPhotoPosts(5, 3, { person: 'kikimer' }) );

  console.log('getPhotoPosts(5, 3, \'object\'):');
  console.log( getPhotoPosts(5, 3, 'object') );

  console.log('getPhotoPosts(5, 4, { author: \'kikimer\', hashTags: [\'reptiloids\', \'supra\'] })');
  console.log( getPhotoPosts(5, 4, { author: 'kikimer', hashTags: ['reptiloids', 'supra'] }) );

  console.log('getPhotoPosts(5, 6, { createdAt: new Date(\'2019-03-05\') })');
  console.log( getPhotoPosts(5, 6, { createdAt: new Date('2019-03-05') }) );


  function getPhotoPost(id) {
    if (typeof id !== 'string') {
      return null;
    } 

    return photoPosts.find(function(photoPost) {
      return photoPost.id === id;
    });
  }


  console.log('---------------');
  console.log('\nchecking getPhotoPost(id: string) function:');
  console.log('getPhotoPost(\'3\'):');
  console.log( getPhotoPost('3') );

  console.log('getPhotoPost(3):');
  console.log( getPhotoPost(3) );

  console.log('getPhotoPost(\'25\'):');
  console.log( getPhotoPost('25') );
  

  function validatePhotoPost(photoPost) {
    if (typeof photoPost !== 'object') {
      return null;
    }

    if (!('id' in photoPost) || (typeof photoPost.id !== 'string') || 
          (photoPost.id.length === 0) || 
        !('description' in photoPost) || (typeof photoPost.description !== 'string') ||
          (photoPost.description.length > 199) ||
        !('createdAt' in photoPost) || !(photoPost.createdAt instanceof Date) ||
        !('author' in photoPost) || (typeof photoPost.author !== 'string') ||
          (photoPost.author.length === 0) ||
        !('photoLink' in photoPost) || (typeof photoPost.photoLink !== 'string') ||
          (photoPost.photoLink.length === 0) ||
        !('hashTags' in photoPost) || !(photoPost.hashTags instanceof Array) ||
        !('likes' in photoPost) || !(photoPost.likes instanceof Array)) {
      return false;
    }

    photoPost.hashTags = photoPost.hashTags.filter(function(hashTag) {
      return typeof hashTag === 'string';
    });
    photoPost.likes = photoPost.likes.filter(function(like) {
      return typeof like === 'string';
    });

    return true;
  }


  console.log('---------------');
  console.log('\nchecking validatePhotoPost(photoPost: object) function:');
  console.log('validatePhotoPost({}):');
  console.log( validatePhotoPost({}) );

  console.log('validatePhotoPost(photoPosts[0]):');
  console.log( validatePhotoPost(photoPosts[0]) );

  console.log('delete(photoPosts[0].author);\nvalidatePhotoPost(photoPosts[0]):');
  delete(photoPosts[0].author);
  console.log( validatePhotoPost(photoPosts[0]) );

  console.log('photoPost[1].id = 1\nvalidatePhotoPost(photoPost[1]):');
  photoPosts[1].id = 1;
  console.log( validatePhotoPost(photoPosts[1]) );


  function addPhotoPost(photoPost) {
    if (!validatePhotoPost(photoPost)) {
      return false;
    }
    photoPosts.push(photoPost);
    return true;
  }


  console.log('---------------');
  console.log('checking addPhotoPost(photoPost: object) function:');
  console.log('addPhotoPost({}):');
  console.log( addPhotoPost({}) );

  let post = {
    id: '21',
    description: 'this is an example for adding this post into the array',
    createdAt: new Date('2019-03-09T22:34:00'),
    author: 'shpillie-willie',
    photoLink: 'images/willie.jpg',
    hashTags: ['sausage', 'bignlong'],
    likes: ['hello', 'willie'],
  };
  console.log('addPhotoPost({'
    + 'id: \'21\','
    + 'description: \'this is an example for adding this post into the array\','
    + 'createdAt: new Date(\'2019-03-09T22:34:00\'),'
    + 'author: \'shpillie-willie\','
    + 'photoLink: \'images/willie.jpg\','
    + 'hashTags: [\'sausage\', \'bignlong\'],'
    + 'likes: [\'hello\', \'willie\'],'
    + '}\'):');
  console.log( addPhotoPost(post) );
  
  console.log('delete(post.author)\naddPhotoPost(post)');
  delete(post.author);
  console.log( addPhotoPost(post) );


  function editPhotoPost(id, photoPost) {
    if (typeof id !== 'string' || typeof photoPost !== 'object' ||
        photoPost === null || photoPost === undefined) {
      return false;
    }

    let post = getPhotoPost(id);
    if (post === undefined) {
      return false;
    }

    let toCheck = {
      id: post.id,
      description: post.description,
      createdAt: post.createdAt,
      author: post.author,
      photoLink: post.photoLink,
      hashTags: post.hashTags,
      likes: post.likes,
    }

    let hasDescription = false;
    let hasPhotoLink = false;
    let hasHashTags = false;

    if ('description' in photoPost) {
      toCheck.description = photoPost.description;
      hasDescription = true;
    }
    if ('photoLink' in photoPost) {
      toCheck.photoLink = photoPost.photoLink;
      hasPhotoLink = true;
    }
    if ('hashTags' in photoPost) {
      toCheck.hashTags = photoPost.hashTags;
      hasHashTags = true;
    }

    if (!validatePhotoPost(toCheck)) {
      return false;
    }

    if (hasDescription) {
      post.description = toCheck.description;
    }
    if (hasPhotoLink) {
      post.photoLink = toCheck.photoLink;
    }
    if (hasHashTags) {
      post.hashTags = toCheck.hashTags;
    }

    return true;
  }


  console.log('---------------');
  console.log('checking editPhotoPost(id: string, photoPost: object) function:');
  console.log('getPhotoPost(\'4\'):');
  console.log( getPhotoPost('4') );
  console.log('editPhotoPost(\'4\', { author: \'moron5\', description: \'changed\' })');
  console.log( editPhotoPost('4', { author: 'moron5', description: 'changed' }));
  console.log( getPhotoPost('4') );

  console.log('getPhotoPost(\'100500\')');
  console.log( getPhotoPost('100500') );
  console.log('editPhotoPost(\'100500\', { author: \'moron5\', description: \'changed\' })');
  console.log( editPhotoPost('100500', { author: 'moron5', description: 'changed' }) );

  console.log('getPhotoPost(\'5\')');
  console.log( getPhotoPost('5') );
  console.log('editPhotoPost(\'5\', { author: \'moron5\', description: \'changed\', photoLink: \'changed\','
    + ' hashTags: [\'this\', \'are\', \'new\', \'hashTags\', 15, null] })');
  console.log( editPhotoPost('5', { author: 'moron5', description: 'changed', photoLink: 'changed',
                                    hashTags: ['this', 'are', 'new', 'hashTags', 15, null] , fakeProp: 'none' }) );
  console.log( getPhotoPost('5') );


  function removePhotoPost(id) {
    let post = getPhotoPost(id);
    if (post === undefined || post === null) {
      return false;
    }

    for (let i = 0; i < photoPosts.length; i++) {
      if (photoPosts[i].id === id) {
        photoPosts.splice(i, 1);
        return true;
      }
    }

    return false;
  }


  console.log('---------------');
  console.log('checking removePhotoPost(id: string) function:');
  console.log('removePhotoPost(\'7\'):');
  console.log( removePhotoPost('7') );
  console.log(photoPosts);
}());