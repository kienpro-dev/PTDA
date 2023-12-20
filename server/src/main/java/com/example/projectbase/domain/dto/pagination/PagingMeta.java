package com.example.projectbase.domain.dto.pagination;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PagingMeta {

  private Long totalElements;

  private Integer totalPages;

  private Integer pageNum;

  private Integer pageSize;

  private String sortBy;

  private String sortType;

  public PagingMeta(long totalElements, int totalPages, int number, int size) {
    this.totalElements=totalElements;
    this.totalPages=totalPages;
    this.pageNum=number;
    this.pageSize=size;
  }
}