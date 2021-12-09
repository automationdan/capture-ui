import React, { Component } from "react";
import {StructuredListWrapper,StructuredListHead,StructuredListRow,StructuredListBody,StructuredListCell } from 'carbon-components-react';


export default class ResultsList extends Component {
  render() {
    return (
    <StructuredListWrapper ariaLabel="Structured list">
      <StructuredListHead>
        <StructuredListRow head tabIndex={0}>
          <StructuredListCell head>Name</StructuredListCell>
          <StructuredListCell head>Value</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {this.props.results.map(d => (<StructuredListRow key={d.fieldName}>
                                        <StructuredListCell><h5>{d.fieldName}</h5> </StructuredListCell>
                                        <StructuredListCell> {d.fieldValue}</StructuredListCell>
                                      </StructuredListRow>))}


      </StructuredListBody>
    </StructuredListWrapper>)
  }
}
