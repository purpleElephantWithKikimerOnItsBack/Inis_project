package resources;

import java.util.List;

public interface PhotoPostDAO {
    PostCollection.Post get(Long id);

    List<PostCollection.Post> getAll();

    List<PostCollection.Post> getByFilter(int page, int limit, String filter);
}
