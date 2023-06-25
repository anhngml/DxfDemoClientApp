import { DxfViewer } from "dxf-viewer"
import { Component, useEffect } from "react"
import * as three from "three"
import DxfViewerWorker from "./DxfViewerWorker"
import { Input, InputNumber, Button } from 'antd';
import { VerticalAlignMiddleOutlined, DownloadOutlined } from '@ant-design/icons';

import axios from 'axios';

// const DEFAULT_BASE_URL = 'http://localhost:5269';
const DEFAULT_BASE_URL = '';

const options = {
  // clearColor: new three.Color("#fff"),
  autoResize: true,
  colorCorrection: true,
}

const dxfClient = axios.create({
  baseURL: `${DEFAULT_BASE_URL}`,
  headers: {
    Accept: "application/dxf",
    "Content-Type": "application/dxf",
    // "Access-Control-Allow-Origin": '*'
  },
});

class MyDxfViewer extends Component {
  state = {
  }
  constructor(props) {
    super(props);
    this.viewer = null;
  }

  init_drawing() {
    const container = document.getElementById("viewer-container");
    this.viewer = new DxfViewer(container, options);
    this.viewer.SetSize(1500, 800)
  }

  draw() {
    if (this.viewer && this.props.h != null && this.props.r != null && this.props.s != null) {
      console.log(this.props);
      // this.viewer.Clear();
      const url = `${DEFAULT_BASE_URL}/api/DXFOps/GetDXF?h=${this.props.h}&r=${this.props.r}&s=${this.props.s}`;
      console.log(url);
      this.viewer.Load(
        {
          url: url,
          // workerFactory: DxfViewerWorker
        })
    }
  }

  componentDidUpdate(prevProps) {
    this.draw();
  }

  componentDidMount() {
    this.init_drawing();
    this.draw();
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <>
        <div id='viewer-container'
          style={
            {
              position: 'relative', height: '100%', width: '100%'
            }
          }
        />
        <div style={{ position: 'fixed', top: 16, right: 24 }}>
          <Button  icon={<DownloadOutlined />} size={'default'}
            onClick={event => {
              dxfClient.get(`api/DXFOps/GetDXF?h=${this.props.h}&r=${this.props.r}&s=${this.props.s}`, {
                method: 'GET',
                headers: {
                  Accept: "application/dxf",
                  "Content-Type": "application/dxf",
                  // "Access-Control-Allow-Origin": '*'
                },
              })
                .then((response) => {
                  // console.log(response);
                  return response.data
                })
                .then((blob) => {
                  // Create blob link to download
                  const url = window.URL.createObjectURL(
                    new Blob([blob]),
                  );
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute(
                    'download',
                    `downloaded_file.dxf`,
                  );

                  // Append to html link element page
                  document.body.appendChild(link);

                  // Start download
                  link.click();

                  // Clean up and remove the link
                  link.parentNode.removeChild(link);
                });
            }}
          >
            Export DXF
          </Button>
        </div>
      </>
    )
  }
}

export default MyDxfViewer;