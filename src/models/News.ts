export class Tags {
  id: string;
  newsId: string;
  title: string;
  meta_url: string;
  constructor(id: string, newsId: string, title: string, meta_url: string) {
    this.id = id;
    this.newsId = newsId;
    this.title = title;
    this.meta_url = meta_url;
  }
}

export class News {
  id: string;
  idUser: string;
  idCategories: number;
  title: string;
  description: string;
  details: string;
  image: string;
  meta_url: string;
  keywordSEO: string;
  view: number;
  tags: Tags[];
  create_by: string;
  create_date: string;
  modify_by: string;
  modify_date: string;
  status: boolean;
  isDeleted: boolean;
  constructor(
    id: string,
    idUser: string,
    idCategories: number,
    title: string,
    description: string,
    details: string,
    image: string,
    meta_url: string,
    keywordSEO: string,
    view: number,
    tags: Tags[],
    create_by: string,
    create_date: string,
    modify_by: string,
    modify_date: string,
    status: boolean,
    isDeleted: boolean
  ) {
    this.id = id;
    this.idUser = idUser;
    this.idCategories = idCategories;
    this.title = title;
    this.description = description;
    this.details = details;
    this.image = image;
    this.meta_url = meta_url;
    this.keywordSEO = keywordSEO;
    this.view = view;
    this.tags = tags;
    this.create_by = create_by;
    this.create_date = create_date;
    this.modify_by = modify_by;
    this.modify_date = modify_date;
    this.status = status;
    this.isDeleted = isDeleted;
  }
}
