import React from 'react';
import DocumentUnderstanding from '../../components/DocumentUnderstanding'


const DataCap = () => {
  return <div>
<DocumentUnderstanding page="Passport_Page" application="dan" workflow="dan" rules="Documents,NormalOCR,GenerateText,PassportFields" docId="tm000001" />
  </div>;
};

export default DataCap;
