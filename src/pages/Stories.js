import React, { Component } from 'react'
import classes from '../styles/Stories.module.css'
import Fa from 'react-fontawesome'

class Stories extends Component {
    constructor() {
        super()
        this.state = {
            storyIndex: 0,
            isActive:true
        }
    }
    storySlide = (index, time) => {
        let { storyIndex } = this.state
        if (storyIndex > index) {
            return {
                width: '100%',
            }
        } else if (storyIndex === index) {
            return {
                animation: `width100 ${time}s linear`,
            }
        } else if (storyIndex < index) {
            return {
                width: '0',
            }
        }
    }
    nextImage = () => {
        let { storyIndex } = this.state
        let { stories } = this.props.location.data || JSON.parse(localStorage.getItem('data'))
        setTimeout(() => {
            if (storyIndex !== stories.length - 1 && this.state.isActive) {
                let setIndex = async () => {
                    await this.setState({ storyIndex: storyIndex + 1 })
                }
                setIndex().then(e => {
                    this.nextImage()

                })
            }else{
                this.props.history.push('/')
            }
        }, stories[storyIndex].duration * 1000);
    }
    componentDidMount() {
        this.nextImage()
    }
    componentWillUnmount(){
        this.setState({isActive:false})
    }
    render() {
        let { avatar, userName, stories } = this.props.location.data || JSON.parse(localStorage.getItem('data'))
        let { storyIndex } = this.state
        return (
            <div className={classes.stories}>
                <img src={stories[storyIndex].image} className={classes.storyMedia} alt='story' />
                <div className={classes.header}>
                    <div className={classes.storiesLength}>
                        {stories.map((item, index) => (
                            <div key={index}>
                                <div>
                                    <div style={this.storySlide(index, item.duration)} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={classes.profile}>
                        <img src={avatar} alt='avatar' />
                        <p>{userName}</p>
                    </div>
                </div>
                <div name='space' style={{ flex: 1 }} />
                <div className={classes.message}>
                    <div>
                        <input type='text' placeholder='Type a message' />
                    </div>
                    <button>
                        <Fa name='send-o' />
                    </button>
                </div>
            </div>
        )
    }
}

export default Stories