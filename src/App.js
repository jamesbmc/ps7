import React, { Component } from 'react';
import './App.css';
import { Route, NavLink, Switch} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div className="app">
                <h1>James McCutcheon</h1>
                <Navigation />
                <Main likes={this.props.likes} projects={this.props.projects} />
            </div>
        );
    }
    componentDidMount() {
        document.title = "James McCutcheon | Personal Website";
    }
}

class Navigation extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
                    <li><NavLink exact activeClassName="current" to='/contact'>Contact</NavLink></li>
                    <li><NavLink exact activeClassName="current" to='/projects'>Projects</NavLink></li>
                </ul>
            </nav>
        );
    }
}

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={(routerProps) => (
                        <HomePage {...routerProps} likes={this.props.likes} />
                    )}
                />
                <Route exact path='/contact' component={ContactPage} />
                <Route exact path='/projects' render={(routerProps) => (
                        <ProjectPage {...routerProps} projects={this.props.projects} />
                    )}
                />
            </Switch>
        );
    }
}

class HomePage extends Component {
    render() {
        return (
            <div>
                <h2>Welcome to my personal website</h2>
                <p>Built for Problem Set 7 in INFO 340 using React.</p>
                <h3>Likes: </h3>
                <LikesTable likes={this.props.likes}/>
            </div>
        );
    }
}

class LikesTable extends Component {
    render() {
        let likes = this.props.likes.map(like => {
            return <Like key={like.name} like={like} />
        });
        return (
            <table className="table table-bordered">
                <TableHeader cols={['Name', 'Amount']} />
                <tbody>
                    {likes}
                </tbody>
            </table>
        );
    }
}

class ProjectTable extends Component {
    render() {
        let projects = this.props.projects.map(project => {
            return <Project key={project.name} project={project} />
        });
        return (
            <table className="table table-bordered">
                <TableHeader cols={['Name', 'Grade']} />
                <tbody>
                    {projects}
                </tbody>
            </table>
        );
    }
}

class TableHeader extends Component {
    render() {
        let headers = this.props.cols.map((h) => {
            return <th key={h}>{h}</th>
        });
        return (
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
        );
    }
}

class Like extends Component {
    render() {
        let like = this.props.like;
        return (
            <tr>
                <td>{like.name}</td>
                <td>{like.amount + '/10'}</td>
            </tr>
        );
    }
}

class Project extends Component {
    render() {
        let project = this.props.project;
        return (
            <tr>
                <td>{project.name}</td>
                <td>{project.grade + '/' + project.total}</td>
            </tr>
        );
    }
}

class ContactPage extends Component {
    render() {
        let about = ['I am a 5th year senior in Informatics and Business at the University of Washington.'];
        let contact = ['Email: jbmc@uw.edu', 'Phone: 425-495-9109'];
        return (
            <div>
                <Section header='About Me' content={about} />
                <Section header='Contact Me' content={contact} />
            </div>
        );
    }
}

class Section extends Component {
    render() {
        let content = this.props.content.map(content => {
            return <p>{content}</p>
        });
        return (
            <div>
                <h2>{this.props.header}</h2>
                {content}
            </div>
        );
    }
}

class ProjectPage extends Component {
    render() {
        return (
            <div>
                <h2>Project Grades</h2>
                <p>Grades for stages of the project in INFO 340:</p>
                <ProjectTable projects={this.props.projects}/>
            </div>
        );
    }
}

export default App;
