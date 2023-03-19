import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textContent: '텍스트 내용을 입력하세요.' // 상태 초기값 설정
        };
    }
    
    componentDidMount() {
        // 여기서는 텍스트 내용을 가져오는 API 호출 등을 수행합니다.
        // 이 예시에서는 간단하게 상태 값을 변경하는 setTimeout 함수를 사용합니다.
        setTimeout(() => {
            this.setState({textContent: '변경된 텍스트 내용입니다.'});
        }, 1000);
    }
    
    render() {
        return (
            <Card>
                <CardContent>
                    {this.state.textContent}
                </CardContent>
            </Card>
        );
    }
}

export default Detail;