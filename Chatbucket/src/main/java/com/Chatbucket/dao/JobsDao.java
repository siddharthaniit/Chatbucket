package com.Chatbucket.dao;

import java.util.List;

import com.Chatbucket.model.JobRegistration;
import com.Chatbucket.model.Jobs;

public interface JobsDao {
	 void addJob(Jobs job);
	   List<Jobs> viewJobs();
	   void deleteJob(int id);
	   void updateJob(Jobs job);
	   Jobs viewJob(int id);
	   void registerJob(JobRegistration jobRegistration);
	}


