import {Col, Row, Skeleton, Space} from 'antd';
import React from 'react';

const App: React.FC = () => {
    return (
        <div className="container">
            <Space direction="vertical" size={28} style={{width: '100%'}}>
                <Row gutter={[24, 24]} wrap>
                    {Array.from({length: 4}, (_, index) => (
                        <Col key={index} flex="1 1 25%">
                            <Skeleton paragraph={{rows: 4}} active/>
                        </Col>
                    ))}
                </Row>

                <Row gutter={24}>
                    <Skeleton paragraph={{rows: 8}} active/>
                </Row>
            </Space>
        </div>
    );
};

export default App;
