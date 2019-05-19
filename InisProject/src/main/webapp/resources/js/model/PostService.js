class PostService {
    async getPage(start, count, filter) {
        let page;

        await fetch(`photoposts?start=${start}&count=${count}`, {
            method: 'POST',
            body: `${JSON.stringify(filter)}`,
        }).then((response) => {
                return response.text();
            },
            () => {
                messageBox.toggleMessageBox(MessageBox.LOAD_POSTS_ERROR);
                setTimeout(() => messageBox.toggleMessageBox(), 5000);
            }
        ).then((photoPosts) => {
            page = JSON.parse(photoPosts);
        });

        return page;
    }

    async get(id) {
        let post;

        await fetch(`photo-post?id=${id}`, { method: 'GET' })
            .then((response) => {
                return response.text();
                },
                () => {
                messageBox.toggleMessageBox(MessageBox.GET_POST_ERROR);
                setTimeout(() => messageBox.toggleMessageBox(), 5000);
            }).then((response) => {
                post = JSON.parse(response);
        });

        return post;
    }

    async remove(id) {
        let removed = false;

        await fetch(`photo-post?id=${id}`, { method: 'DELETE' })
            .then(
                (response) => {
                    return response.text();
                }
            ).then(
            (response) => {
                if (response.includes('true')) {
                    removed = true;
                }
            }
        );

        return removed;
    }

    async generateId() {
        let id;

        await fetch(`photo-post?method=generateId`, { method: 'GET' })
            .then(
                (response) => {
                    return response.text();
                }
            )
            .then(postId => {
                    id = postId;
                },
                () => {
                    messageBox.toggleMessageBox(MessageBox.GENERATE_ID_ERROR);
                    setTimeout(() => messageBox.toggleMessageBox(), 5000);
            });

        return id;
    }

    async add(post) {
        let added = false;

        await fetch(`photo-post?method=add`, {
            method: 'POST',
            body: `${JSON.stringify(post)}`,
        }).then(response => {
            return response.text();
        }).then((response) => {
            if (response.includes('true')) {
                added = true;
            }},
            () => {
                messageBox.toggleMessageBox(MessageBox.ADD_POST_ERROR);
                setTimeout(() => messageBox.toggleMessageBox(), 5000);
        });

        return added;
    }

    async edit(id, changes) {
        let edited = false;

        await fetch(`photo-post?method=edit&id=${id}`, {
            method: 'POST',
            body: `${JSON.stringify(changes)}`,
        }).then(
            (response) => {
            return response.text();
        },() => {
            messageBox.toggleMessageBox(MessageBox.EDIT_POST_ERROR);
            setTimeout(() => messageBox.toggleMessageBox(), 5000);
        }).then((response) => {
            if (response.includes('true')) {
                edited = true;
            } else {
                messageBox.toggleMessageBox(MessageBox.CHECK_FIELDS);
                setTimeout(() => messageBox.toggleMessageBox(), 5000);
            }
        });

        return edited;
    }
}

const postService = new PostService();