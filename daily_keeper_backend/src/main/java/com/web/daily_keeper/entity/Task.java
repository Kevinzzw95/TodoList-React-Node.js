package com.web.daily_keeper.entity;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.UUID;

import org.hibernate.annotations.Type;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tasks")
@Setter
@Getter
@NoArgsConstructor
@Data
public class Task {

	@Id
	@Column(name = "id")
    private String id;
	
	@Column(name = "content")
	private String content;
	
	//@CreationTimestamp
	@Column(name = "date")
	private OffsetDateTime date;
	
	@Column(name = "is_done")
	private boolean isDone;
	
	@Column(name = "tag_id")
	private Integer tagId;
	
	@Column(name = "is_important")
	private boolean isImportant;
	
	@Column(name = "is_urgent")
	private boolean isUrgent;
	
}
