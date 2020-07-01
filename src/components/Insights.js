import React, { Fragment } from 'react'
import { Row, Col, Spin, Input, Typography, Divider, Card } from 'antd';
import styled from 'styled-components';
import { LoadingOutlined, ArrowUpOutlined, PercentageOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Like from "../images/like.jpg";
import Heart from "../images/heart.jpg";
import Curious from "../images/curious.jpg";
import Bulb from "../images/bulb.jpg";
import Clap from "../images/clap.jpg";
import CountUp from 'react-countup';
import { isEqual } from 'lodash'
import { connect } from "react-redux";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { loadInsight, postAnalyse } from "../actions/InsightAction"
// import ReactSvgPieChart from "react-svg-piechart";

const { Search } = Input;

const SearchInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    padding-left: 0px;
    p{
      font-weight:700;
    } 
`;

const Post = styled.div`
    ${'' /* width: 60%;
    padding: 0.5rem 0;
    background-color: #ffdbdb;
    border: 1px solid #ff7373;
    text-align: center;
    font-size: 14px;
    border-radius: 7px;
    color: #960000; */}
`;

const Profiles = styled.div`
    ${'' /* width: 60%;
    padding: 0.5rem 0;
    background-color: #ffdbdb;
    border: 1px solid #ff7373;
    text-align: center;
    font-size: 14px;
    border-radius: 7px;
    color: #960000; */}
`;

const Comments = styled.div`
    ${'' /* width: 60%;
    padding: 0.5rem 0;
    background-color: #ffdbdb;
    border: 1px solid #ff7373;
    text-align: center;
    font-size: 14px;
    border-radius: 7px;
    color: #960000; */}
`;

const ErrorMessage = styled.div`
    width: 60%;
    padding: 0.5rem 0;
    background-color: #ffdbdb;
    border: 1px solid #ff7373;
    text-align: center;
    font-size: 14px;
    border-radius: 7px;
    color: #960000;
`;

const LeftData = styled.div`
   color: white;
   height: 12vh;
   paddingLeft:10px;
   text-align: center;

`;

const Button = styled.button`
  width: 70%;
    padding: 0.7rem 0;
    color: black;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
      box-shadow: 0 1px 3px #ccc;
      cursor: pointer;
    }
`;

const AnalyseButton = styled(Button)`
    background-color: ${props => !props.loading ? '#1890ff' : 'rgba(24, 144, 255, 0.3)'};
    color: white;

    &:active, &:focus{
      outline:none;
    }
`;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class Insight extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: null,
            visible: false,
            loading: false,
            errorMessage: ''
        }

    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        loading: PropTypes.bool,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.loadInsight();
    }

    componentDidUpdate(prevProps) {
        // if (!isEqual(prevProps.insight, this.props.insight)) {
        //     this.props.loadInsight();
        // }
    }


    handleAnalyseClick = (posturl) => {
        this.props.postAnalyse(posturl)
        this.props.history.push("/postInsight")
    }
    handelSearch = (e) => {
        this.state.url = e.target.value
    }

    render() {
        const { errorMessage, loading } = this.state;
        const { posturl, insight } = this.props;
        // console.log(insight, 't')
        console.log(insight.totalPosts, 'post')
        console.log(insight.totalComments, 'comment')
        console.log(insight.totalEmails, 'emails')
        console.log(insight.totalProfiles, 'profile')

        return (
            <Fragment>
                <h2>Enter the Url Here</h2>
                <SearchInput>
                    {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
                    <Search
                        style={{ width: "60%" }}
                        placeholder="Enter the Post URL...."
                        enterButton="Analyse"
                        size="large"
                        onChange={this.handelSearch}
                        onSearch={this.handleAnalyseClick}
                    />
                </SearchInput>
                <Row style={{
                    marginTop: "18px",
                    paddingTop: "5px",
                    paddingLeft: "1rm",
                    height: "77vh",
                    justifyContent: "space-around",
                }}>
                    <Spin indicator={antIcon} spinning={loading} style={{ color: '#1890ff', background: 'none' }} ></Spin>
                    <Col xs={4} style={{
                        backgroundColor: "aqua",
                        paddingTop: "10px"
                    }}>
                        <LeftData >
                            <h1 style={{ fontWeight: 300 }}>Total Posts </h1>
                            <h2><CountUp start={0} end={insight.totalPosts}
                                duration={4} /></h2>
                        </LeftData>
                        <Divider />
                        <LeftData >
                            <h1 style={{ fontWeight: 300 }}>Total Profiles</h1>
                            <h2><CountUp start={0} end={insight.totalProfiles} duration={4} /></h2>
                        </LeftData>
                        <Divider />
                        <LeftData >
                            <h1 style={{ fontWeight: 300 }}>Total Comments</h1>
                            <h2><CountUp start={0} end={insight.totalComments} duration={5} /></h2>
                        </LeftData>
                        <Divider />
                        <LeftData >
                            <h1 style={{ fontWeight: 300 }}>Total Likes</h1>
                            <h2><CountUp start={0} end={insight.totalLikes} duration={5} /></h2>
                        </LeftData>
                    </Col>
                    <Col xs={14} style={{
                        paddingBottom: "5px",
                    }} >
                        <h1 style={{ margin: "10px", fontSize: "17px", letterSpacing: "5px", textAlign: "center" }}>Posts</h1>
                        <Post style={{ display: "flex", paddingTop: "4px" }}>
                            <Card title="Total Post" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                                <div style={{ width: "fit-content" }}>
                                    <h2 style={{
                                        fontSize: "50px",
                                        fontFamily: "Open Sans,sans-serif",
                                        border: "1px solid #666",
                                        padding: "10px 37px",
                                        color: "#666"
                                    }}><CountUp start={0} end={insight.totalPosts} duration={4} /></h2>
                                </div>
                            </Card>
                            <Card title="Post per/day" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                                <div style={{ width: "fit-content" }}>
                                    <h2 style={{
                                        fontSize: "50px",
                                        fontFamily: "Open Sans,sans-serif",
                                        border: "1px solid #666",
                                        padding: "10px 37px",
                                        color: "green"
                                    }}><CountUp start={0} end={3.1} duration={3} /> <ArrowUpOutlined /></h2>
                                </div>
                            </Card>
                        </Post>
                        <h1 style={{ margin: "10px", fontSize: "17px", letterSpacing: "5px", textAlign: "center" }}>Profiles</h1>
                        <Profiles style={{ display: "flex", paddingTop: "18px", justifyContent: "space-between" }}>
                            <Card title="Total Profile" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                                <div style={{ width: "fit-content" }}>
                                    <h2 style={{
                                        fontSize: "50px",
                                        fontFamily: "Open Sans,sans-serif",
                                        border: "1px solid #666",
                                        padding: "10px 37px",
                                        color: "#666"
                                    }}><CountUp start={0} end={insight.totalProfiles} duration={4} /></h2>
                                </div>
                            </Card>
                            <Card title="Profile per/day" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                                <div style={{ width: "fit-content" }}>
                                    <h2 style={{
                                        fontSize: "50px",
                                        fontFamily: "Open Sans,sans-serif",
                                        border: "1px solid #666",
                                        padding: "10px 37px",
                                        color: "#666"
                                    }}><CountUp start={0} end={22} duration={4} /></h2>
                                </div>
                            </Card>
                            <Card title="Connected Profiles" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                                <div style={{ width: "fit-content" }}>
                                    <h2 style={{
                                        fontSize: "50px",
                                        fontFamily: "Open Sans,sans-serif",
                                        border: "1px solid #666",
                                        padding: "10px",
                                        color: "#666"
                                    }}><CountUp start={0} end={insight.connectedProfiles} duration={4} /><PercentageOutlined /></h2>
                                </div>
                            </Card>
                        </Profiles>
                    </Col>
                    <Col xs={4} style={{
                        backgroundColor: "aqua",
                        paddingTop: "10px"
                    }}>
                        <LeftData >
                            <h1>Total Connections</h1>
                            <h2><CountUp start={0} end={104} duration={4} /></h2>
                        </LeftData>
                        <Divider />
                    </Col>
                </Row>
                <Row style={{ display: "block" }}>
                    <h1 style={{ margin: "10px", letterSpacing: "5px", fontSize: "large", textAlign: "center" }}>Comments</h1>
                    <Comments style={{ display: "flex", justifyContent: "space-between" }}>
                        <Card title="Total Comments" bordered={false} style={{ width: 150, textAlign: "center", height: "25vh", width: "fit-content" }}>
                            <div style={{ width: "fit-content" }}>
                                <h2 style={{
                                    fontSize: "28px",
                                    fontFamily: "Open Sans,sans-serif",
                                    border: "1px solid #666",
                                    padding: "10px 37px",
                                    color: "#666"
                                }}><CommentOutlined /> <CountUp start={0} end={insight.totalComments} duration={5} /></h2>
                            </div>
                        </Card>
                        <Card title="Avg Comments" bordered={false} style={{ width: 150, textAlign: "center", height: "25vh", width: "fit-content" }}>
                            <div style={{ width: "fit-content" }}>
                                <h2 style={{
                                    fontSize: "28px",
                                    fontFamily: "Open Sans,sans-serif",
                                    border: "1px solid #666",
                                    padding: "10px 37px",
                                    color: "green"
                                }}><CountUp start={0} end={insight.avgCommentsPerPost} duration={3} /><ArrowUpOutlined /></h2>
                            </div>
                        </Card>
                        <Card title="Total Emails Found" bordered={false} style={{ width: 150, textAlign: "center", height: "25vh", width: "fit-content" }}>
                            <div style={{ width: "fit-content" }}>
                                <h2 style={{
                                    fontSize: "28px",
                                    fontFamily: "Open Sans,sans-serif",
                                    border: "1px solid #666",
                                    padding: "10px 37px",
                                    color: "green"
                                }}><CountUp start={0} end={insight.totalEmails} duration={4} /><ArrowUpOutlined /></h2>
                            </div>
                        </Card>
                        <Card title="% of Emails from Comments" bordered={false} style={{ width: 150, textAlign: "center", height: "25vh", width: "fit-content" }}>
                            <div style={{ width: "fit-content" }}>
                                <h2 style={{
                                    fontSize: "28px",
                                    fontFamily: "Open Sans,sans-serif",
                                    border: "1px solid #666",
                                    padding: "10px 37px",
                                    color: "blue"
                                }}><CountUp start={0} end={insight.emailPercentage} duration={2} /><PercentageOutlined /></h2>
                            </div>
                        </Card>
                    </Comments>
                </Row>
                <Row style={{ display: "block" }}>
                    <h1 style={{ margin: "10px", fontSize: "large", letterSpacing: "5px", textAlign: "center" }}>Likes</h1>
                    <Comments style={{ display: "flex", justifyContent: "space-between" }}>
                        <Card title="Total Likes" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                            <div style={{ width: "fit-content" }}>
                                <h2 style={{
                                    fontSize: "28px",
                                    fontFamily: "Open Sans,sans-serif",
                                    border: "1px solid #666",
                                    padding: "10px 37px",
                                    color: "#666"
                                }}><LikeOutlined /> <CountUp start={0} end={insight.totalLikes} duration={5} /></h2>
                            </div>
                        </Card>
                        <Card title="Avg Likes/Post" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                            <div style={{ width: "fit-content" }}>
                                <h2 style={{
                                    fontSize: "28px",
                                    fontFamily: "Open Sans,sans-serif",
                                    border: "1px solid #666",
                                    padding: "10px 37px",
                                    color: "green"
                                }}><CountUp start={0} end={insight.avgLikesPerPost} duration={4} /><ArrowUpOutlined /></h2>
                            </div>
                        </Card>
                        <Card title="Reactions" bordered={false} style={{ width: 500, textAlign: "center", paddingTop: "2px", height: "28vh", width: "fit-content", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "500px", paddingTop: "2px" }}>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Like} alt="Like" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={insight.likesPercentage ? insight.likesPercentage : '0%'} duration={4} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Clap} alt="Clap" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={insight.praisePercentage ? insight.praisePercentage : '0%'} duration={2} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Heart} alt="Heart" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={insight.empathyPercentage ? insight.emailPercentage : '0%'} duration={2} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Bulb} alt="Bulb" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={insight.interestPercentage ? insight.interestPercentage : '0%'} duration={1} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Curious} alt="Curious" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={insight.maybePercentage ? insight.maybePercentage : '00%'} duration={1} /><PercentageOutlined /></h2>
                                </div>
                            </div>
                        </Card>
                    </Comments>
                </Row>
            </Fragment>
        )
    }
}
const mapStateToProps = ({ insight, error }) => {
    // console.log("state on page", insightData);
    return {
        insight,
        error
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadInsight: () => {
            dispatch(loadInsight());
        },
        postAnalyse: (posturl) => {
            dispatch(postAnalyse(posturl));
        },
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Insight)
