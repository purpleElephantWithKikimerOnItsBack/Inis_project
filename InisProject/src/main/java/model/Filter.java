package model;

import java.util.Arrays;

public class Filter {
    private String author;
    private String createdAt;
    private String[] hashTags;

    public String getAuthor() {
        return author;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String[] getHashTags() {
        return hashTags;
    }

    @Override
    public String toString() {
        return String.format("%s\n%s\n%s\n",
                author, createdAt, Arrays.toString(hashTags));
    }
}
