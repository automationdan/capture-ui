import React, { Component } from "react";
import UploadService from "../../services/upload-files.service";
import DocView from '../DocView';
import { Button,FileUploaderDropContainer,Breadcrumb,BreadcrumbItem,InlineLoading } from 'carbon-components-react';
import ResultsList from './ResultsList'
import { Grid, Row, Column } from 'carbon-components-react';
import Timer from "../Timer"

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.baseUrl = process.env.REACT_APP_DCAPPROXY;

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "Please Upload Your " +this.props.page,
      results: [],
      docUrls: [ { fileData: '' } ],
      fileInfos: [],
      docUrl: undefined,
      docStatus: "Begin"
    };
  }

  selectFile(event) {
    //console.log(event.target.files)
    let thepage = this.props.page
    /*this.setState({
      selectedFiles: event.target.files,
    });*/
    console.log("hello world")
    console.log(event.target.files.length);
    let currentFile = event.target.files[event.target.files.length-1];
    event.target.files = null;
    UploadService.upload(currentFile,thepage, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    }).then((response) => {
        console.log(response.data.transactionalId);
        var getImagePath = URL.createObjectURL(currentFile);
        console.log(getImagePath);
        this.setState({
            transactionalId: response.data.transactionalId,
            message: "Uploaded Document",
            docUrl: this.baseUrl +"/api/documentunderstanding/getdoc/" + response.data.transactionalId+ "/pdf",
            selectedFiles: currentFile
        })
      })





  }

  executeRules(transactionaId, application, workflow,docId,rulesToExecute, counter){

    console.log(counter);
    console.log(rulesToExecute[counter]);
    console.log(rulesToExecute)

    let ruleExec = rulesToExecute[counter];

    this.setState({
      message: "Rules processed"
    })
    if(rulesToExecute.length > counter){
      if(workflow === "TradeFinance"){
          ruleExec = "Configuration,Convert,InsightRecognition,Classify,AnalysePageLayout,EntitySearch,Collection";
          counter = 7
      }

      UploadService.executeRule(this.state.transactionalId,application,workflow,ruleExec,docId,(event) =>{
        this.setState({
          progress: Math.round((100 * event.loaded) / event.total),
        });
      }).then((response)=>{
        this.setState({
          message: rulesToExecute[counter] + "processed"
        })
        counter++
        console.log(counter);
        this.executeRules(transactionaId,application,workflow,docId,rulesToExecute,counter);
      })
    }else{
      UploadService.getTransactionalFile(transactionaId,"xml", docId, (event) =>{
        this.setState({
          progress: Math.round((100 * event.loaded) / event.total),
        });
      }).then((response)=>{
        console.log(response.data)
          this.setState({
            results: response.data.values,
            message: "Document Processed",
            transactionId: response.data.transactionalId,
            docStatus: "Done"
          })

          console.log(counter);
          //this.executeRules(transactionaId,application,workflow,docId,rulesToExecute,counter);
        })

    }
  }
  upload() {

    let application = this.props.application
    let workflow = this.props.workflow
    let rules = this.props.rules
    let docId = this.props.docId
    let currentRule = 0;
    console.log("upload" + this.state.transactionalId);
    this.setState({
      docStatus: "Processing",
    });

    var rulesToExecute =rules.split(",")
    console.log(rulesToExecute);
    console.log(rulesToExecute.length);
    this.executeRules(this.state.transactionalId,application,workflow,docId,rulesToExecute,currentRule);



    this.setState({
      selectedFiles: undefined,
    });
  }

  upload2() {

    let application = this.props.application
    let workflow = this.props.workflow
    let rules = this.props.rules
    let docId = this.props.docId
    console.log("upload" + this.state.transactionalId);
    this.setState({
      docStatus: "Processing",
    });

    var rulesToExecute =rules.split(",")
    console.log(rulesToExecute.length);
    let currentRule = 0;
    UploadService.executeRules(this.state.transactionalId,application,workflow,rulesToExecute[currentRule],docId,(event) =>{
        this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    }).then((response)=>{
      console.log(response.data)

      this.setState({
        results: response.data.values,
        message: "Document Processed",
        transactionId: response.data.transactionalId,
        docStatus: "Done"
      });
      console.log(this.state);
      return "stuff"
    })

    this.setState({
      selectedFiles: undefined,
    });
  }



  render() {
    const {
      selectedFiles
    } = this.state;

    return (
  <div>

  <Grid>
    <Row>
      <Column lg={16}>
        <Breadcrumb aria-label="Page navigation">
          <BreadcrumbItem>
            <a href="/">{this.props.page}</a>
            </BreadcrumbItem>
            </Breadcrumb>
            <h1 className="landing-page__heading">{this.state.message}</h1>
      </Column>
    </Row>
    <Row>
      <Column lg={16}>
        <div style={{ width: '500px' }}>
        <FileUploaderDropContainer
          accept={[
            '.jpg',
            '.pdf',
            '.tif'
          ]}
          onAddFiles={this.selectFile}
          buttonkind="primary"
          buttonlabel="Add files"
          filenamestatus="edit"
          icondescription="Clear file"
          labelText="Add File to this container"
          className="bx--file__container"
          ></FileUploaderDropContainer>
          </div>

      </Column>
    </Row>
    <Row>
      <Column lg={16}>
       <Button disabled={!selectedFiles} onClick={this.upload} style={{ width: '1500px' }}>
         Process Document
         </Button>
      </Column>
    </Row>
    <Row>
    <Column>
      <h1>Document</h1>
    {this.state.docUrl !== undefined  &&


     <DocView src={this.state.docUrl} />

    }

    </Column>
      <Column>
      <h1>Document Details</h1>
        {this.state.docStatus==="Processing" &&
          <InlineLoading description="Processing..." />

        }
        {this.state.message==="Document Processed" &&

          <ResultsList results={this.state.results} />

        }
      </Column>



    </Row>
</Grid>







      </div>
    );
  }
}
