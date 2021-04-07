import axios, { AxiosResponse } from "axios";
import { News } from "../../models/News";
import axiosService from "../httpService/axios.service";
import { AnswerChecked, Question, TestList } from "../../models/Question";
import { TLicenseType } from "../../interfaces/question";

type dataCheckQuestions = {
  id_suite: number;
  answers: { id_question: number; answer: string }[];
};
class UserRequestService {
  constructor() {}
  //API News Page
  getNewsById(id: string, meta: string) {
    const uri = `user/${meta}/${id}/news`;
    return axiosService.getMethod(uri);
  }
  getListNews(idCate: number, pageNumber: number) {
    const uri = `user/${idCate}/news?page=${pageNumber}`;
    return axiosService.getMethod<News>(uri);
  }
  getListSubCategoriesById(id: number) {
    const uri = `user/list/category/${id}`;
    return axiosService.getMethod(uri);
  }
  getListPagination(cateId: number) {
    const uri = `user/${cateId}/news/pagination`;
    return axiosService.getMethod(uri);
  }
  getListChilPagination(meta: string) {
    const uri = `user/${meta}`;
    return axiosService.getMethod(uri);
  }
  getListChildNews(meta: string) {
    const uri = `user/${meta}`;
    return axiosService.getMethod(uri);
  }
  getListNewsPupolar() {
    const uri = `user/popular/news`;
    return axiosService.getMethod(uri);
  }
  search(query: string) {
    const uri = `user/news/search?key=${query}`;
    return axiosService.getMethod(uri);
  }
  //End API News Page

  //API Home Page

  //{{url}}/api/user/photos
  get3album() {
    const uri = `user/photos`;
    return axiosService.getMethod(uri);
  }

  //{{url}}/api/user/photo/5
  getDetailAlbum (id) {
    const uri = `user/photo/${id}`;
    return axiosService.getMethod(uri);
  }

  getCarousel() {
    const uri = `user/slide`;
    return axiosService.getMethod(uri);
  }
  //{{url}}/api/user/home/news
  getHomeNews() {
    const uri = `user/home/news`;
    return axiosService.getMethod(uri);
  }
  //{{url}}/api/user/about
  getHomeAbout() {
    const uri = `user/3/news-homepage`;
    return axiosService.getMethod(uri);
  }
  //{{url}}/api/user/home/notification/news
  getHomeNotification() {
    const uri = `user/home/notification/news`;
    return axiosService.getMethod(uri);
  }
  //End API Home Page

  //API Information
  //api/user/information
  getInformation() {
    const uri = `user/information`;
    return axiosService.getMethod(uri);
  }
  //End API Information
  // https://api.hellobugs.dev/api/user/upload/ck
  uploadFile(data) {
    console.log(data);
    const uri = "https://api.hellobugs.dev/api/user/upload/ck";
    axiosService.setContentType("multipart/form-data");
    return axiosService.postMethod(uri, data);
  }

  // questions
  getLicenseType() {
    const uri = "user/question/rank";
    return axiosService.getMethod<TLicenseType[]>(uri);
  }

  layDanhSachBoDe(id: number | string) {
    const uri = `user/question/${id}/view-suite`;
    return axiosService.getMethod<TestList>(uri);
  }

  getQuestions(id: number | string) {
    const uri = `user/question/${id}/view-questions`;
    return axiosService.getMethod<Question[]>(uri);
  }

  //SEO API
  //{{url}}/api/user/seo
  getSEO() {
    const uri = `user/seo`;
    return axiosService.getMethod(uri);
  }
  nopBai(id_suite: number, answersChecked: AnswerChecked[]) {
    const uri = `user/question/result`;
    const data: dataCheckQuestions = {
      id_suite,
      answers: answersChecked.map((item) => {
        return { id_question: item.id, answer: item.answer };
      }),
    };
    return axiosService.postMethod<dataCheckQuestions>(uri, data);
  }
}

const userRequestService = new UserRequestService();
export default userRequestService;

//upload file gi
//image để mình demo
//di từ ckeditor/index.js -> api/upload -
