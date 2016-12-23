package com.Chatbucket.dao;

import java.util.List;

import com.Chatbucket.model.Blog;
import com.Chatbucket.model.Forum;

public interface ForumDao {
	void addQuestion(Forum forum);
	List<Forum> viewQuestions();
	 void updateQuestion(Forum forum);
	 void deleteQuestion(int forum_id);
	 List<Forum> viewMyForum(String postedBy);


}
