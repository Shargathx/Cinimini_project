package com.Cinimini.projekt.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameStepDto {
    private Long stepId;
    private List<DiscussionDto> discussionPoints;
    private List<QuestionDto> questions;
    private List<MediaDto> mediaElements;
}
