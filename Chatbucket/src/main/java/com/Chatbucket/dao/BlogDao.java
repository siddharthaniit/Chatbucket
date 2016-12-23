package com.Chatbucket.dao;

import java.util.List;

import com.Chatbucket.model.Blog;

public interface BlogDao {
	void addBlog(Blog blog);
	List<Blog> viewBlogs();
	
	void updateBlog(Blog blog);
	void deleteBlog(int blog_id);
	List<Blog> viewMyBlogs(String postedBy);

}
