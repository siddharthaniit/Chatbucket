package com.Chatbucket.dao;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.Chatbucket.model.Blog;
import com.Chatbucket.model.Forum;

@Transactional
@Repository
public class ForumDaoImpl implements ForumDao {
	
	@Autowired
	SessionFactory sessionFactory;

	public void addQuestion(Forum forum) {
		
		Session session = sessionFactory.getCurrentSession();
		 Date date=new Date();
		 String data=date.toString();
		 forum.setDate(data);
		
		session.save(forum);
		
	}

	public List<Forum> viewQuestions() {
		Session session=sessionFactory.getCurrentSession();
		List<Forum> list = session.createCriteria(Forum.class).list();
		return list;
	}

	public void updateQuestion(Forum forum) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.getCurrentSession();
		 Date date=new Date();
		 String data=date.toString();
		 forum.setDate(data);
		session.update(forum);
		
	}

	public void deleteQuestion(int Forum_id) {
		Session session=sessionFactory.getCurrentSession();
		
		Forum forum=(Forum) session.get(Forum.class,new Integer(Forum_id));
		session.delete(forum);
		
	}

	/*public Forum getQuestion(int id) {
		Session session=sessionFactory.getCurrentSession();
		Forum forum=(Forum) session.get(Forum.class,new Integer(id));
		System.out.println("description:"+forum.getQuestionDescription());
		return forum;
	}
*/
	public List<Forum> viewMyForum(String postedBy) {
		System.out.println("in view my forum");
		Session session=sessionFactory.getCurrentSession();
		Criteria ct=session.createCriteria(Forum.class);
		ct.add(Restrictions.eq("postedBy",postedBy));
		ct.add(Restrictions.eq("status",true));
		List<Forum> list=ct.list();	
		return list;
		}	

	
}
