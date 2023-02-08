package com.web.daily_keeper.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.daily_keeper.dao.TaskRepository;
import com.web.daily_keeper.entity.Task;
import com.web.daily_keeper.service.TaskServiceImpl;


@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class TaskController {

	private final TaskServiceImpl taskServiceImpl;

	public TaskController(TaskServiceImpl taskServiceImpl) {
		this.taskServiceImpl = taskServiceImpl;
	}
	
	/*
	@GetMapping("/tasks")
	public ResponseEntity<Collection<Task>> getAllTasks() {
		return ResponseEntity.ok(taskServiceImpl.findAll());
	}*/
	
	/*
	@PostMapping("/tasks")
	public void saveTask(@RequestBody Task task) {
		taskServiceImpl.saveTask(task);
	}*/
	
}
