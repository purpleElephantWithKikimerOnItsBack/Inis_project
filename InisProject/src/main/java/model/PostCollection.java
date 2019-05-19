package resources;

import com.google.gson.Gson;
import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class PostCollection {
    public static List<String> getPage(int start, int count, String filter) {
        if (start < 0 || start >= PhotoPosts.collection.size()) {
            return new ArrayList<>();
        }

        Gson gson = new Gson();
        Filter f = gson.fromJson(filter, Filter.class);

        List<String> res = PhotoPosts.collection.stream().filter((post) -> {
            Post p = gson.fromJson(post, Post.class);

            if (f.author != null) {
                if (!f.author.equals(p.author)) {
                    return false;
                }
            }

            if (f.createdAt != null) {
                DateTime current = new DateTime(f.createdAt);
                current = current.minusMillis(current.getMillisOfDay());

                DateTime next = current.plusDays(1);

                DateTime postDate = new DateTime(p.createdAt);

                if (postDate.compareTo(current) < 0 || postDate.compareTo(next) > 0) {
                    return false;
                }
            }

            if (f.hashTags != null) {
                return Arrays.stream(p.hashTags).anyMatch(hashTag ->
                        Arrays.asList(f.hashTags).contains(hashTag));
            }

            return true;
        }).collect(Collectors.toList());

        res.sort((x, y) -> {
            Post xObject = gson.fromJson(x, Post.class);
            Post yObject = gson.fromJson(y, Post.class);

            DateTime xDate = new DateTime(xObject.createdAt);
            DateTime yDate = new DateTime(yObject.createdAt);

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

    public static boolean add(String jsonPost) {
        if (validate(jsonPost)) {
            PhotoPosts.collection.add(jsonPost);
            return true;
        }
        return false;
    }

    public static String get(int id) {
        Gson gson = new Gson();

        String result = "";
        for (String ps: PhotoPosts.collection) {
            Post post = gson.fromJson(ps, Post.class);

            if (post.id == id) {
                result = ps;
                break;
            }
        }

        return result;
    }

    public static boolean remove(int id) {
        String result = get(id);

        if (!result.isEmpty()) {
            PhotoPosts.collection.remove(result);
            return true;
        }

        return false;
    }

    public static boolean validate(String jsonPost) {
        Gson gson = new Gson();
        Post post = gson.fromJson(jsonPost, Post.class);

        return post.author != null && post.createdAt != null && post.description != null &&
                post.description.length() < 200 && post.hashTags != null && post.id > 0 &&
                post.photoLink != null && post.likes != null;
    }

    public static boolean edit(int id, String jsonEdit) {
        Gson gson = new Gson();

        Post postToEdit = gson.fromJson(get(id), Post.class);
        Post changes = gson.fromJson(jsonEdit, Post.class);

        postToEdit.description = changes.description;
        postToEdit.hashTags = changes.hashTags;

        String postToEditJson = gson.toJson(postToEdit);

        if (validate(postToEditJson)) {
            remove(postToEdit.id);
            add(postToEditJson);

            return true;
        }

        return false;
    }

    public static int generateId() {
        return PhotoPosts.collection.size() + 1;
    }

    public class Filter {
        private String author;
        private String createdAt;
        private String[] hashTags;

        @Override
        public String toString() {
            return String.format("%s\n%s\n%s\n",
                    author, createdAt, Arrays.toString(hashTags));
        }
    }

    public class Post {
        private int id;
        private String description;
        private String createdAt;
        private String author;
        private String photoLink;
        private String[] hashTags;
        private String[] likes;

        @Override
        public String toString() {
            return String.format("%d\n%s\n%s\n%s\n%s\n%s\n%s\n",
                    id, description, createdAt, author, photoLink,
                    Arrays.toString(hashTags), Arrays.toString(likes));
        }
    }
}
