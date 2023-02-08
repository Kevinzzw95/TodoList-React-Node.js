package com.web.daily_keeper.service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import com.web.daily_keeper.entity.Task;

public interface TaskService<T> {
	
	Optional<T> findById(String id); 
	
	Collection<T> findAll();
	
	void saveTask(Task task);

}
