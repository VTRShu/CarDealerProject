import React, { Component } from 'react';

class CarouselForModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: props.images,
            currIndex: 0,
            isPrevImageVisible: false,
            isNextImageVisible: props.images.length > 1 ? true : false
        };
    }

    onPrevImgClick = () => {
        if (this.state.currIndex > 0) {
            this.setState({
                currIndex: this.state.currIndex - 1,
                isPrevImageVisible: this.state.currIndex - 1 === 0 ? false : true,
                isNextImageVisible: true
            });
        }
    };

    onNextImgClick = () => {
        const { images, currIndex } = this.state;
        if (currIndex < images.length - 1) {
            this.setState({
                currIndex: this.state.currIndex + 1,
                isPrevImageVisible: true,
                isNextImageVisible:
                    this.state.currIndex + 1 === images.length - 1 ? false : true
            });
        }
    };

    render() {
        const { pxs } = this.props;
        const squareSide = pxs + 'px';
        const topPos = (-1 * (pxs * 0.125)).toString() + 'px';
        const color = 'black';

        const {
            images,
            currIndex,
            isPrevImageVisible,
            isNextImageVisible
        } = this.state;
        const imageSquare =
            images.length > 0 ? (
                <div className="item active">
                    <img style={{ width: '100%', height: '50vh' }} src={images[currIndex].url} />
                </div>
            ) : (
                <div style={{ background: color }} />
            );

        return (
            <table style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td
                            style={{
                                verticalAlign: 'middle',
                                cursor: 'pointer',
                                position: 'relative',
                                top: topPos,
                                width: '1%',

                            }}
                        >
                            <i
                                className="fa fa-arrow-circle-left"
                                style={
                                    isPrevImageVisible === true
                                        ? { color: '#0088a9', fontSize: '30px' }
                                        : { color: color, fontSize: '30px' }
                                }
                                aria-hidden="true"
                                onClick={this.onPrevImgClick}
                            />
                        </td>


                        <td style={{ width: '50%' }}>
                            <div style={{ height: squareSide }}>
                                <div className="carousel slide">
                                    <div className="carousel-inner" role="listbox">
                                        {imageSquare}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td
                            style={{
                                verticalAlign: 'middle',
                                cursor: 'pointer',
                                position: 'relative',
                                top: topPos, width: '1%'
                            }}
                        >
                            <i
                                className="fa fa-arrow-circle-right"
                                style={
                                    isNextImageVisible === true
                                        ? { color: '#0088a9', fontSize: '30px' }
                                        : { color: color, fontSize: '30px' }
                                }
                                aria-hidden="true"
                                onClick={this.onNextImgClick}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default CarouselForModal;
