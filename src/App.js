import './App.css';

import { cylinder } from "@jscad/modeling/src/primitives";
import { Renderer } from "jscad-react";

import { Input, InputNumber, Button } from 'antd';
import { VerticalAlignMiddleOutlined, DownloadOutlined, RetweetOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import { useEffect, useState, memo } from 'react';
import MyDxfViewer from './components/DxfViewer';

import { Breadcrumb, Layout, Menu, theme, Image } from 'antd';
const { Header, Content, Footer } = Layout;

const Drawing = memo(MyDxfViewer);

const App = () => {
  const [params, setParams] = useState({ h: 30, r: 30, s: 6 });
  const [solids, setSolids] = useState([
    cylinder({ center: [0, 0, 12], height: 30, radius: 30, segments: 6 }),
  ]);
  const [project, setProject] = useState(true);
  const [projectParams, setProjectParams] = useState({ ...params });
  useEffect(() => {
    if (params.h > 0 && params.r > 0 && params.s >= 4) {
      setSolids([
        cylinder({ center: [0, 0, params.h / 2], height: params.h, radius: params.r, segments: params.s }),
      ]);
      // setProjectParams({...params})
    }
  }, [params])

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>

      <Layout className="layout" style={{height: 'vh'}}>
        <Header style={{display:'flex'}}>
          <div className="logo">
            <Image
              // width={200}
              height={70}
              src="/Logo 2 mau-04.png"
              preview={false}
            ></Image>
          </div>
          <div style={{textAlign: 'center', flexGrow: 1, color: 'white', fontSize: 28}}>Demo for Nagaoka</div>
        </Header>
        <Content
          style={{
            // padding: '0 50px',
          }}
        >
          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
              display: 'flex',
              flexFlow: 'row'
            }}
          >
            {/* <div style={{ width: '100%', height: '100%', backgroundColor: 'lightgray', display: 'flex' }}> */}
              <div style={{ width: 300, backgroundColor: 'lightgray', padding: 5  }}>
                <div style={{ width: '100%', height: 300, backgroundColor: 'blue', overflow: 'hidden' }}>
                  <Renderer solids={solids} height={300} width={300} options={{ axisOptions: { show: false }, gridOptions: { show: true, } }} />
                </div>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>

                  <Space direction="vertical" size="small" style={{ display: 'flex', margin: 3 }}>
                    <div></div>
                    <InputNumber
                      value={params.h}
                      max={60}
                      min={25}
                      // formatter={(value) => `height: ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      style={{ width: '100%' }}
                      placeholder="Height"
                      // prefix={<VerticalAlignMiddleOutlined />}
                      prefix={'height:  '}
                      onChange={value => setParams({ ...params, h: value })}
                    />
                    <InputNumber
                      value={params.r}
                      max={35}
                      min={20}
                      // formatter={(value) => `radius: ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      style={{ width: '100%' }} placeholder="Radius"
                      // prefix={<VerticalAlignMiddleOutlined />}
                      prefix={'radius:  '}
                      onChange={value => setParams({ ...params, r: value })}
                    />
                    <InputNumber
                      value={params.s}
                      max={20}
                      min={4}
                      // formatter={(value) => `segments: ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      style={{ width: '100%' }} placeholder="Segments"
                      // prefix={<VerticalAlignMiddleOutlined />}
                      prefix={'segments:  '}
                      onChange={value => setParams({ ...params, s: value })}
                    />
                    <Button type="primary"
                      onClick={event => { setProjectParams({ ...params }) }}
                    >Project</Button>
                  </Space>
                </div>
              </div>
              <div style={{ flexGrow:1, marginLeft: 8, marginRight: 0, backgroundColor: 'black', overflow: 'hidden' }}>
                {
                  projectParams && <Drawing h={projectParams.h} r={projectParams.r} s={projectParams.s}></Drawing>
                }

              </div>

            {/* </div> */}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            // height: 50
          }}
        >
          Copyright by AI Academy
        </Footer>
      </Layout>

























    </>
  )
};

export default App;
