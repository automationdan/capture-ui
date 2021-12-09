import React, { useRef, useState } from "react";
class Fileupload extends React.Component {

  //const [selectedFile, setSelectedFile] = useState();
  //const [isFilePicked, setIsFilePicked] = useState(false);

  render() {
    return
    <div>
   <input type="file" name="file" onChange={changeHandler} />
   <div>
     <button onClick={handleSubmission}>Submit</button>
   </div>
 </div>;
  }
}

export default Fileupload;
