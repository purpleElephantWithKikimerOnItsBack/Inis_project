class PostCollection {
    constructor(postService) {
        this._postService = postService;
    }

    edit(id, changes) {
        return this._postService.edit(id, changes);
    }

    add(post) {
        return this._postService.add(post);
    }

    remove(id) {
        return this._postService.remove(id);
    }

    get(id) {
        return this._postService.get(id);
    }

    getPage(start, count, filter) {
        return this._postService.getPage(start, count, filter);
    }

    generateId() {
        return this._postService.generateId();
    }
}

const postCollection = new PostCollection(postService);