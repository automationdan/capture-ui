import React from 'react';
import DocumentUnderstanding from '../../components/DocumentUnderstanding'


const Invoices = () => {
  return <div>
    <DocumentUnderstanding page="Other" application="TradeFinance" workflow="TradeFinance"
    rules="Configuration,Convert,InsightRecognition,Classify,AnalysePageLayout" docId="TM000002" />
  </div>;
};

export default Invoices;
