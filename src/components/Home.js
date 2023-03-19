import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Home extends React.Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <div style={{ fontSize: '25px' }}>
                        <div>
                            IoT 기반 실시간 변위측정 시스템
                        </div>
                    </div>
                    <div style={{ visibility: 'hidden', fontsize: '300px' }}>
                            a
                    </div>
                    <div style={{ visibility: 'hidden', fontsize: '300px' }}>
                            a
                    </div>
                    <div style={{ fontSize: '20px' }}>
                        시공현장 :
                    </div>
                    <div style={{ visibility: 'hidden', fontsize: '300px' }}>
                            a
                    </div>
                    <div style={{ fontSize: '20px' }}>
                        시공기간 :
                    </div>
                    <div style={{ visibility: 'hidden' }}>
                            a
                    </div>
                    <div style={{ fontSize: '20px' }}>
                        시공사 :
                    </div>
                    <div style={{ visibility: 'hidden' }}>
                            a
                    </div>
                    <div style={{ fontSize: '20px' }}>
                        터널정보 :
                    </div>
                    <div style={{ visibility: 'hidden' }}>
                            a
                    </div>
                    <div style={{ fontSize: '20px' }}>
                        시공방법 :
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default Home;