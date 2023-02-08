package com.web.daily_keeper.service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.web.daily_keeper.dao.TaskRepository;
import com.web.daily_keeper.entity.Task;

@Service
public class TaskServiceImpl implements TaskService<Task>{
	
	private TaskRepository taskRepository;
	
	public TaskServiceImpl(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}
	
	@Override
	public Optional<Task> findById(String id) {
		return this.taskRepository.findById(id);
	}
	
	@Override
	public Collection<Task> findAll() {
		return this.taskRepository.findAll();
	}
	
	@Override
	public void saveTask(Task task) {
		taskRepository.save(task);
	}


}
