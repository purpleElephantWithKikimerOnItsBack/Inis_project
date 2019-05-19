package model;

import java.util.Arrays;

public class Post {
    private int id;
    private String description;
    private String createdAt;
    private String author;
    private String photoLink;
    private String[] hashTags;
    private String[] likes;

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public String[] getHashTags() {
        return hashTags;
    }

    public void setHashTags(String[] hashTags) {
        this.hashTags = hashTags;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public String[] getLikes() {
        return likes;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return String.format("%d\n%s\n%s\n%s\n%s\n%s\n%s\n",
                id, description, createdAt, author, photoLink,
                Arrays.toString(hashTags), Arrays.toString(likes));
    }
}
