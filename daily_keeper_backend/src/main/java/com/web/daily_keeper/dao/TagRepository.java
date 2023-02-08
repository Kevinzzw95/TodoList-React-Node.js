package com.web.daily_keeper.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.web.daily_keeper.entity.Tag;


@CrossOrigin("http://localhost:3000")
public interface TagRepository extends JpaRepository<Tag, Integer>{

}
