import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
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
import { PieChart } from 'react-minimal-pie-chart';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { loadInsight, postAnalyse } from "../actions/InsightAction";
import { connect } from "react-redux";





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

class PostInsight extends React.Component {
    state = {
        message: null,
        visible: false,
        loading: false,
        errorMessage: ''

    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        loading: PropTypes.bool,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
    }



    componentDidUpdate(prevProps) {
        const { error, isLoading, insightData } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'POST_ERROR') {
                this.setState({ errorMessage: error.message })
            } else {
                this.setState({ errorMessage: null })
            }
        }
        if (isLoading !== prevProps.isLoading) {
            this.setState({ loading: isLoading })
        }
    }



    render() {
        const { errorMessage, loading } = this.state;
        const { insightData } = this.props
        console.log(insightData, 'one usersssss loaded');
        const { like, praise, interest, empathy, maybe } = this.props.insightData;
        const peoplesChoice = Math.max(like, praise, interest, empathy, maybe);

        // console.log(insightData)


        return (
            <Fragment>
                <Row style={{
                    marginTop: "18px",
                    paddingTop: "5px",
                    paddingLeft: "1rm",
                    height: "78vh",
                    justifyContent: "space-around",
                }}>
                    <Col xs={4} style={{
                        backgroundColor: "#A0D9FF",
                        paddingTop: "10px"
                    }}>
                        <LeftData >
                            <h1 style={{ fontWeight: 300 }}>Total Posts</h1>
                            <h2><CountUp start={0} end={this.props.insight.totalPosts ? this.props.insight.totalPosts : '0'} duration={4} /></h2>
                        </LeftData>
                        <Divider />
                        <LeftData >
                            <h1 style={{ fontWeight: 300 }}>Total Profiles</h1>
                            <h2><CountUp start={0} end={this.props.insight.totalProfiles ? this.props.insight.totalProfiles : '0'} duration={4} /></h2>
                        </LeftData>
                        <Divider />
                        <LeftData >
                            <h1 style={{ fontWeight: 300 }}>Total Comments</h1>
                            <h2><CountUp start={0} end={this.props.insight.totalComments ? this.props.insight.totalComments : '0'} duration={5} /></h2>
                        </LeftData>
                        <Divider />
                        <LeftData >
                            <h1 style={{ fontWeight: 300 }}>Total Likes</h1>
                            <h2><CountUp start={0} end={this.props.insight.totalLikes ? this.props.insight.totalLikes : '0'} duration={5} /></h2>
                        </LeftData>
                    </Col>
                    <Col xs={9} style={{
                        paddingBottom: "5px",
                    }} >
                        <Post style={{ display: "flex", paddingTop: "4px" }}>
                            {/* <Card title="Total Post" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}> */}
                            <div style={{ width: "100%", textAlign: "center" }}>
                                <label style={{ fontWeight: "600" }}>Post Link :</label><p><a href={this.props.insightData.posturl} target="_blank">{this.props.insightData.posturl}</a></p>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <label style={{ fontWeight: "600" }}>Posted By :</label><p>{this.props.insightData.postedBy}</p>
                                    </div>
                                    <div>
                                        <label style={{ fontWeight: "600" }}>Scraped Time :</label><p>{this.props.insightData.scrapedtime}</p>
                                    </div>
                                </div>
                            </div>
                            {/* </Card> */}
                        </Post>
                        <Profiles style={{ display: "flex", justifyContent: "space-between" }}>
                            <Card title="Post Comments" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                                <div style={{ width: "fit-content" }}>
                                    <h2 style={{
                                        fontSize: "50px",
                                        fontFamily: "Open Sans,sans-serif",
                                        border: "1px solid #666",
                                        padding: "0px 10px",
                                        color: "#666"
                                    }}><CountUp start={0} end={this.props.insightData.totalComments ? this.props.insightData.totalComments : '0'} duration={5} /></h2>
                                </div>
                            </Card>
                            <Card title="Emails Found" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                                <div style={{ width: "fit-content" }}>
                                    <h2 style={{
                                        fontSize: "50px",
                                        fontFamily: "Open Sans,sans-serif",
                                        border: "1px solid #666",
                                        padding: "0px 10px",
                                        color: "#666"
                                    }}><CountUp start={0} end={this.props.insightData.totalEmails ? this.props.insightData.totalEmails : '0'} duration={4} /></h2>
                                </div>
                            </Card>
                        </Profiles>
                        <Profiles style={{ display: "flex", justifyContent: "space-between" }}>
                            <Card title="Post Likes" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                                <div style={{ width: "fit-content" }}>
                                    <h2 style={{
                                        fontSize: "50px",
                                        fontFamily: "Open Sans,sans-serif",
                                        border: "1px solid #666",
                                        padding: "0px 10px",
                                        color: "#666"
                                    }}><CountUp start={0} end={this.props.insightData.totalLikes ? this.props.insightData.totalLikes : '0'} duration={4} /></h2>
                                </div>
                            </Card>
                            <Card title="Peoples Choice" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                                <div style={{ width: "fit-content" }}>
                                    <h2 style={{
                                        fontSize: "50px",
                                        fontFamily: "Open Sans,sans-serif",
                                        border: "1px solid #666",
                                        padding: "0px 10px",
                                        color: "#666"
                                    }}><CountUp start={0} end={peoplesChoice} duration={4} /></h2>
                                </div>
                            </Card>
                        </Profiles>
                        {/* <Card title="Reactions" bordered={false} style={{ width: 500, textAlign: "center", paddingTop: "2px", height: "28vh", width: "fit-content", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", justifyContent: "space-around", width: "85vh" }}>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Like} alt="Like" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={this.props.insightData.likesPercentage ? this.props.insightData.likesPercentage : '0'} duration={4} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Clap} alt="Clap" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={this.props.insightData.praisePercentage ? this.props.insightData.praisePercentage : '0'} duration={2} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Heart} alt="Heart" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={this.props.insightData.empathyPercentage ? this.props.insightData.empathyPercentage : '0'} duration={2} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Bulb} alt="Bulb" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={this.props.insightData.interestPercentage ? this.props.insightData.interestPercentage : '0'} duration={1} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Curious} alt="Curious" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={this.props.insightData.maybePercentage ? this.props.insightData.maybePercentage : '0'} duration={1} /><PercentageOutlined /></h2>
                                </div>
                            </div>
                        </Card> */}
                    </Col>
                    <Col xs={10} style={{
                        backgroundColor: "white",
                        paddingTop: "10px"
                    }}>
                        <LeftData >
                            <h2>Reaction Chart</h2>
                            <PieChart style={{ height: "300px", marginTop: "20px" }}
                                data={[
                                    { title: 'Like', value: like, color: '#0F487F' },
                                    { title: 'Praise', value: praise, color: '#346DA4' },
                                    { title: 'Empathy', value: empathy, color: '#5891C8' },
                                    { title: 'Interest', value: interest, color: '#7CB5EC' },
                                    { title: 'maybe', value: maybe, color: '#A0D9FF' }
                                ]}
                            />
                            <div style={{ display: "flex", justifyContent: "space-between", width: "auto", padding: "10px 30px" }}>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Like} alt="Like" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={this.props.insightData.like ? this.props.insightData.like : '0'} duration={4} /></h2>
                                    <div style={{ height: "10px", width: "10px", backgroundColor: "#0F487F", display: "inline-block" }}></div>
                                </div>
                                < div style={{ width: "fit-content" }}>
                                    <img src={Clap} alt="Clap" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={this.props.insightData.praise ? this.props.insightData.praise : '0'} duration={2} /></h2>
                                    <div style={{ height: "10px", width: "10px", backgroundColor: "#346DA4", display: "inline-block" }}></div>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Heart} alt="Heart" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={this.props.insightData.empathy ? this.props.insightData.empathy : '0'} duration={2} /></h2>
                                    <div style={{ height: "10px", width: "10px", backgroundColor: "#5891C8", display: "inline-block" }}></div>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Bulb} alt="Bulb" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={this.props.insightData.interest ? this.props.insightData.interest : '0'} duration={1} /></h2>
                                    <div style={{ height: "10px", width: "10px", backgroundColor: "#7CB5EC", display: "inline-block" }}></div>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Curious} alt="Curious" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={this.props.insightData.maybe ? this.props.insightData.maybe : '0'} duration={1} /></h2>
                                    <div style={{ height: "10px", width: "10px", backgroundColor: "#A0D9FF", display: "inline-block" }}></div>
                                </div>
                            </div>

                        </LeftData>
                    </Col>
                </Row>
                {/* <Row style={{ display: "block" }}>
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
                                }}><CommentOutlined /> <CountUp start={0} end={14302} duration={5} /></h2>
                            </div>
                        </Card>
                        <Card title="Comments per/day" bordered={false} style={{ width: 150, textAlign: "center", height: "25vh", width: "fit-content" }}>
                            <div style={{ width: "fit-content" }}>
                                <h2 style={{
                                    fontSize: "28px",
                                    fontFamily: "Open Sans,sans-serif",
                                    border: "1px solid #666",
                                    padding: "10px 37px",
                                    color: "green"
                                }}><CountUp start={0} end={483} duration={3} /><ArrowUpOutlined /></h2>
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
                                }}><CountUp start={0} end={5498} duration={4} /><ArrowUpOutlined /></h2>
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
                                }}><CountUp start={0} end={38.4} duration={2} /><PercentageOutlined /></h2>
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
                                }}><LikeOutlined /> <CountUp start={0} end={14302} duration={5} /></h2>
                            </div>
                        </Card>
                        <Card title="Likes per/day" bordered={false} style={{ width: 150, textAlign: "center", height: "28vh", width: "fit-content" }}>
                            <div style={{ width: "fit-content" }}>
                                <h2 style={{
                                    fontSize: "28px",
                                    fontFamily: "Open Sans,sans-serif",
                                    border: "1px solid #666",
                                    padding: "10px 37px",
                                    color: "green"
                                }}><CountUp start={0} end={483} duration={4} /><ArrowUpOutlined /></h2>
                            </div>
                        </Card> */}
                {/* <Card title="Reactions" bordered={false} style={{ width: 500, textAlign: "center", paddingTop: "2px", height: "28vh", width: "fit-content", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "500px", paddingTop: "2px" }}>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Like} alt="Like" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={58} duration={4} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Clap} alt="Clap" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={17} duration={2} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Heart} alt="Heart" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={19} duration={2} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Bulb} alt="Bulb" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={4} duration={1} /><PercentageOutlined /></h2>
                                </div>
                                <div style={{ width: "fit-content" }}>
                                    <img src={Curious} alt="Curious" style={{ height: "50px" }} />
                                    <h2><CountUp start={0} end={2} duration={1} /><PercentageOutlined /></h2>
                                </div>
                            </div>
                        </Card> */}
                {/* </Comments> */}
                {/* </Row > */}
                <Link to="/insight" style={{ margin: "20px" }}>Back</Link>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ insightData, insight }) => {
    return {
        insightData,
        insight
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postAnalyse: (posturl) => {
            dispatch(postAnalyse(posturl));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostInsight)

