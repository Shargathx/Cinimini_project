package com.Cinimini.projekt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class MediaDto {
    private Long id;
    //    private String url; //TODO: comment in later, if cloud-based server is a thing
    private String mediaType;
    private String fileName;
    private byte[] fileData;
}
