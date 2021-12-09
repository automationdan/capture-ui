import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import DocViewer from "react-doc-viewer";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "Please Upload Your Document",
      results: [],
      docUrls: [ { fileData: 'http://localhost:3000/api/documentunderstanding/getdoc/fa7e4cc0-b283-4e4d-b79d-39736930aa72/pdf' } ],
      fileInfos: [],
    };
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    }).then((response) => {
        console.log(response.data.transactionalId);
        this.setState({
            message: "Uploaded Document, Now Processing....."
        })
        UploadService.executeRules(response.data.transactionalId,(event) =>{
            this.setState({
            progress: Math.round((100 * event.loaded) / event.total),
          });
        }).then((response)=>{
          console.log(response.data)
          this.setState({
            docUrls: [{uri: "/api/documentunderstanding/getdoc/" + response.data.transactionalId+ "/pdf"}],
            results: response.data.values,
            message: "Document Processed",
            transactionId: response.data.transactionalId
          });
          return "stuff"
        })
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  showDocviewer(){
    return  <DocViewer documents={this.state.docUrls} />
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
    } = this.state;

    return (
      <div>
        <h1>{this.state.message}</h1>
        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        <table>
          <tbody>


          {this.state.results.map(d => (<tr key={d.fieldName}>
            <td><h5>{d.fieldName}</h5> </td>
            <td> {d.fieldValue}</td>
          </tr>))}

          </tbody>
        </table>
      </div>
    );
  }
}
