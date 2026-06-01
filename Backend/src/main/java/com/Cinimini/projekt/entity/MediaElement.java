package com.Cinimini.projekt.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "media")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MediaElement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "game_step_id")
    private GameStep gameStep;

    private String mediaType;

    private String fileName;

    //    @Lob
//    @Basic(fetch = FetchType.LAZY)
    @JdbcTypeCode(SqlTypes.VARBINARY)
    @Column(name = "file_data")
//    @Column(name = "file_data", columnDefinition = "bytea")
    private byte[] fileData;
}