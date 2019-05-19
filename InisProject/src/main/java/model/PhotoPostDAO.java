package model;

import java.util.List;

public interface PhotoPostDAO {
    List<String> getPage(int start, int count, String filter);
    String get(int id);
    boolean add(String jsonPost);
    boolean remove(int id);
    boolean validate(String jsonPost);
    boolean edit(int id, String jsonEdit);
}
