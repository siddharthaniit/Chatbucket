package com.Chatbucket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Chatbucket.dao.ForumDao;
import com.Chatbucket.model.Blog;
import com.Chatbucket.model.Forum;

@RestController
public class ForumController {
	@Autowired
	ForumDao forumDao;
	@RequestMapping(value="/addQuestion",headers="Accept=application/json",method=RequestMethod.POST)
	  public void addQuestion(@RequestBody Forum forum)
	  {
		 forumDao.addQuestion(forum); 
	  }
	@RequestMapping(value="/viewQuestions",headers="Accept=application/json",method=RequestMethod.GET)
	  public List<Forum> viewQuestions(Forum forum)
	  {
		 return forumDao.viewQuestions();
	  }
	@RequestMapping(value="/updateQuestion",headers="Accept=application/json",method=RequestMethod.PUT)
	public void updateQuestion(@RequestBody Forum forum)
	{
		forumDao.updateQuestion(forum);
	}
	@RequestMapping(value="/deleteQuestion/{Forum_id}",headers="Accept=application/json",method=RequestMethod.DELETE)
	public void deleteQuestion(@PathVariable("Forum_id") int id)
	{
		forumDao.deleteQuestion(id);
	}
	/*@RequestMapping(value="/getQuestion/{id}",headers="Accept=application/json",method=RequestMethod.GET)
	public Forum getQuestion(@PathVariable("id") int id)
	{
		return forumDao.getQuestion(id);
	}*/
	
	@RequestMapping(value="/viewMyForum/{postedBy}",headers="Accept=Application/json",method=RequestMethod.GET)
	public List<Forum> viewMyForum(@PathVariable("postedBy") String postedBy)
	{
		return forumDao.viewMyForum(postedBy);
		
	}
	
}
