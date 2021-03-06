import React, { Component } from "react";
import ReactDOM from "react-dom";
import { SvgLoader, SvgProxy } from "../src/index";
import svgcontents from "raw-loader!./1.svg";
import textsvg from "raw-loader!./text.svg";

/* Add different use cases. Assertions will be made from 
   the test files and run with cypress */
class App extends Component {
  
  state = {
    svgContent: svgcontents
  }

  changesvgXML() {
    //change the svg content for test
    const newSvg = this.state.svgContent.replace('#4990E2', '#000')
    this.setState({...this.state, svgContent: newSvg});
  }

  render() {

    return (
      <div>
        <h1>
          {" "}
          Cypress tests make assertions against this page rendered elements.
        </h1>
        <p> Basic ajax loading</p>
        <SvgLoader id="basic" path="1.svg" />

        <p> Update fill property to red</p>
        <SvgLoader id="basic-update" path="1.svg">
          <SvgProxy selector="#Star" fill="red" />
        </SvgLoader>

        <p> Pass style prop with custom width and border</p>

        <SvgLoader
          id="use-style-prop"
          style={{ width: "500px", height: "200px", border: "solid 1px" }}
          path="1.svg"
        >
          <SvgProxy selector="#Star" fill="red" />
        </SvgLoader>

        <p> Pass null as path</p>

        <SvgLoader
          id="null-path"
          style={{ width: "500px", height: "200px", border: "solid 1px" }}
          path={null}
        >
          <SvgProxy selector="#Star" fill="red" />
        </SvgLoader>

        <p> Avoid ajax request, use svgXML prop to set svg contents </p>
        <SvgLoader
          svgXML={svgcontents}
          style={{ width: "500px", height: "200px", border: "solid 1px" }}
        >
          <SvgProxy selector="#Star" fill="red" />
        </SvgLoader>

        <p> Using style prop for proxy (change color to red)</p>
        <SvgLoader
          svgXML={svgcontents}
          style={{ width: "500px", height: "200px", border: "solid 1px" }}
        >
          <SvgProxy selector="#Star" style={{ fill: "red" }} />
        </SvgLoader>

        <p> Replacing text content to "Hello SVG"</p>
        <SvgLoader
          id="change-text"
          svgXML={textsvg}
          style={{ width: "500px", height: "200px", border: "solid 1px" }}
        >
          <SvgProxy selector="text#label tspan" stroke="black">
            Hello SVG
          </SvgProxy>
        </SvgLoader>

        <p>Using onElementSelected to update the element</p>
        <SvgLoader
          id="onElementSelectedTest"
          svgXML={svgcontents}
          style={{ width: "500px", height: "200px", border: "solid 1px" }}
        >
          <SvgProxy selector="polygon#Star" fill="red" />
        </SvgLoader>

        <p>Updating svgXML prop updates svg contents</p>
        <button id="btnChangeSVG" onClick={this.changesvgXML.bind(this)}> Change svgXML </button>
        <SvgLoader
          id="updatesvgxmlprop"
          svgXML={this.state.svgContent}
          style={{ width: "500px", height: "200px", border: "solid 1px" }}
        >
        </SvgLoader>

        
        <p>Append content without overwriting attribute using $CURRENT token</p>
        <SvgLoader
          id="keepcurrentattributevalue"
          svgXML={svgcontents}
          style={{ width: "500px", height: "200px", border: "solid 1px" }}
        >
          <SvgProxy selector="g#Page-1" transform="$ORIGINAL translate(10,10)" />
        </SvgLoader>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#container"));
