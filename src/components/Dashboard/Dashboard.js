import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Image } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css'

import Spinner from '../UI/Spinner/Spinner';
import ErrorBox from '../ErrorBox/ErrorBox';
import * as actions from '../../store/actions/index';
import './Dashboard.css';

export const Dashboard = (props) => {

    const { getImages } = props;

    const [page] = useState(1);

    useEffect(() => {
        getImages(page);
    }, [getImages, page]);

    const fetchData = () => {
        getImages(props.page);
    }

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1,
        500: 1
    };

    return (
        <div>
            <div className="banner">
                Unsplash Photos
            </div>
            {props.loading ? <Spinner /> :
                Object.values(props.images).length > 0 ?
                    <Container fluid className="my-5">
                        <InfiniteScroll
                            dataLength={props.images.length}
                            next={fetchData}
                            hasMore={props.error ? false : true}
                            loader={<Spinner />}
                            endMessage={
                                <ErrorBox>{props.error}</ErrorBox>
                              }
                        >
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                            >
                                {Object.values(props.images).map(image => (
                                    <div key={image.id} className="image">
                                        <Image className="img" style={{ width: "100%" }} src={image.urls.small} alt={image.alt_description} />
                                        <div className="caption">
                                            <span style={{ marginRight: "5px" }}>
                                                <Image className="profileImage" src={image.user.profile_image.small} />
                                            </span>{image.user.name}
                                        </div>
                                    </div>
                                ))}
                            </Masonry>
                        </InfiniteScroll>
                    </Container>
                    :
                    <ErrorBox>No Images Found!</ErrorBox>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.image.error,
        images: state.image.images,
        loading: state.image.loading,
        page: state.image.page
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getImages: (page) => dispatch(actions.getImages(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

