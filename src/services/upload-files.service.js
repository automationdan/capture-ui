import http from "../http-common";

class UploadFilesService {
  upload(file,page, onUploadProgress) {
    let formData = new FormData();

    formData.append("uploadFile", file);

    return http.post("/uploadAndPrepare/" + page, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  executeRule(transactionalId,application, workflow, rules, docId, onUploadProgress) {
    let formData = new FormData();

    let url = "/executeRule/" + transactionalId + "/" + application + "/"+workflow +"/"+rules
    console.log(url)

    return http.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  executeRules(transactionalId,application, workflow, rules, docId, onUploadProgress) {
    let formData = new FormData();

    let url = "/executeRules/" + transactionalId + "/" + application + "/"+workflow +"/"+rules+"/xml/"+ docId
    console.log(url)

    return http.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getTransactionalFile(transactionalId,ext, docId, onUploadProgress) {
    let formData = new FormData();

    let url = "/getDataFile/" + transactionalId + "/" + ext + "/"+docId
    console.log(url)

    return http.get(url, formData, {
      onUploadProgress,
    });
  }



  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();
