package com.web.daily_keeper.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JacksonInject.Value;
import com.web.daily_keeper.entity.Task;

@CrossOrigin("http://localhost:3000")
public interface TaskRepository extends JpaRepository<Task, String>{
	
	Optional<Task> findByTagId(@Param("id") Integer id);
}
