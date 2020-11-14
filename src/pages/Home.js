import Axios from 'axios'
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import Story from '../components/Story/Story'
import classes from '../styles/Home.module.css'
// import Fa from 'react-fontawesome'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            stories: [],
            storiesIndex: 0
        }
    }
    componentDidMount() {
        Axios.get('http://sociallift.io/react/').then(({ data }) => {
            this.setState({ stories: data })
        })
    }
    slideStories(type) {
        let { storiesIndex, stories } = this.state
        let pages = (stories.length - 5)
        switch (type) {
            case 'next':
                if (storiesIndex !== pages) {
                    this.setState({ storiesIndex: storiesIndex + 1 })
                }
                break;
            case 'prev':
                if (storiesIndex !== 0) {
                    this.setState({ storiesIndex: storiesIndex - 1 })
                }
                break
            default:
                break;
        }
    }
    render() {
        let { stories, storiesIndex } = this.state
        return (
            <div className={classes.home}>
                <div id='stories' className={classes.stories} onMouseEnter={() => {
                }}>
                    <button className={classes.prevStory} onClick={() => {
                        this.slideStories('prev')
                    }}>
                        <FontAwesome name='angle-double-left' />
                    </button>
                    <div>
                        <div>
                            {stories.map((item, index) => (
                                <Link
                                    style={{ transform: `translateX(${storiesIndex * -100}%)` }}
                                    key={index}

                                    to={{
                                        pathname: 'stories/:' + item.userName,
                                        data: item,
                                    }}
                                    onClick={() => {
                                        localStorage.setItem('data', JSON.stringify(item))
                                    }}
                                >
                                    <Story avatar={item.avatar} username={item.userName} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <button className={classes.nextStory} onClick={() => {
                        this.slideStories('next')
                    }} >
                        <FontAwesome name='angle-double-right' />
                    </button>
                </div>
                <div className={classes.main}>
                    main
                </div>
            </div>
        )
    }
}

export default Home