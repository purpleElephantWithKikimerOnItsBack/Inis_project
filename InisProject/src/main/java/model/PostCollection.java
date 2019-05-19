package model;

import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class PostCollection implements PhotoPostDAO {
    public static final PostCollection postCollection = new PostCollection();
    public static final List<String> photoPosts = PhotoPosts.collection;

    private PostCollection(){};
    public PostCollection getInstance() {
        return postCollection;
    }

    public List<String> getPage(int start, int count, String filter) {
        if (start < 0 || start >= photoPosts.size()) {
            return new ArrayList<>();
        }

        Filter f = (Filter)GsonParser.fromJson(filter, Filter.class);

        List<String> res = photoPosts.stream().filter((post) -> {
            Post p = (Post)GsonParser.fromJson(post, Post.class);

            if (f.getAuthor() != null) {
                if (!f.getAuthor().equals(p.getAuthor())) {
                    return false;
                }
            }

            if (f.getCreatedAt() != null) {
                DateTime current = new DateTime(f.getCreatedAt());
                current = current.minusMillis(current.getMillisOfDay());

                DateTime next = current.plusDays(1);

                DateTime postDate = new DateTime(p.getCreatedAt());

                if (postDate.compareTo(current) < 0 || postDate.compareTo(next) > 0) {
                    return false;
                }
            }

            if (f.getHashTags() != null) {
                return Arrays.stream(p.getHashTags()).anyMatch(hashTag ->
                        Arrays.asList(f.getHashTags()).contains(hashTag));
            }

            return true;
        }).collect(Collectors.toList());

        res.sort((x, y) -> {
            Post xObject = (Post)GsonParser.fromJson(x, Post.class);
            Post yObject = (Post)GsonParser.fromJson(y, Post.class);

            DateTime xDate = new DateTime(xObject.getCreatedAt());
            DateTime yDate = new DateTime(yObject.getCreatedAt());

            return yDate.compareTo(xDate);
        });


        if (start >= res.size()) {
            return new ArrayList<>();
        }
        if (start + count > res.size()) {
            return res;
        }

        return res.subList(start, start + count);
    }

    public boolean add(String jsonPost) {
        if (validate(jsonPost)) {
            photoPosts.add(jsonPost);
            return true;
        }
        return false;
    }

    public String get(int id) {
        String result = "";
        for (String ps: photoPosts) {
            Post post = (Post)GsonParser.fromJson(ps, Post.class);

            if (post.getId() == id) {
                result = ps;
                break;
            }
        }

        return result;
    }

    public boolean remove(int id) {
        String result = get(id);

        if (!result.isEmpty()) {
            photoPosts.remove(result);
            return true;
        }

        return false;
    }

    public boolean validate(String jsonPost) {
        Post post = (Post)GsonParser.fromJson(jsonPost, Post.class);

        return post.getAuthor() != null && post.getCreatedAt() != null && post.getDescription() != null &&
                post.getDescription().length() < 200 && post.getHashTags() != null && post.getId() > 0 &&
                post.getPhotoLink() != null && post.getLikes() != null;
    }

    public boolean edit(int id, String jsonEdit) {
        Post postToEdit = (Post)GsonParser.fromJson(get(id), Post.class);
        Post changes = (Post)GsonParser.fromJson(jsonEdit, Post.class);

        postToEdit.setDescription(changes.getDescription());
        postToEdit.setHashTags(changes.getHashTags());
        postToEdit.setCreatedAt(changes.getCreatedAt());

        String postToEditJson = GsonParser.toJson(postToEdit);

        if (validate(postToEditJson)) {
            remove(postToEdit.getId());
            add(postToEditJson);

            return true;
        }

        return false;
    }

    public List<String> filter(String filter) {
        Filter f = (Filter)GsonParser.fromJson(filter, Filter.class);
        return getPage(0, photoPosts.size(), filter);
    }

    public int generateId() {
        return photoPosts.size() + 1;
    }
}
