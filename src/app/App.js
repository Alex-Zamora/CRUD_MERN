import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e) {
        e.preventDefault();
        // console.log(this.state);

        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'applications/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task Update'});
                this.setState({title: '', description: '', _id: ''});
                this.fetchTask();
            });
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accetp': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Task Saved'});
                    this.setState({title: '', description: ''});
                    this.fetchTask();
                })
                .catch(err => console.log(err));
        }


    }

    componentDidMount() {
        // console.log('componente fue montado');
        this.fetchTask();
    }

    fetchTask() {
        fetch('api/tasks')
            .then(res => res.json())
            .then(data => { 
                // console.log('DATA ' + data);
                this.setState({tasks: data});
                // console.log('STATE ' + this.state.tasks);
            })
    }
    
    deleteTask(id) {

        if (confirm('Are you sure you want deleted it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accetp': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task Deleted'});
                this.fetchTask();
            });
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a href="/" className="brand-logo">MERN Stack</a>
                    </div>
                </nav>

                {/* CONTAINER */}
                <div className="container">
                    <div className="row">
                        <div className="col s4">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue dark-4">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s8">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button onClick={ () => this.editTask(task._id) } className=" btn light-blue darken-4">
                                                            <i className="material-icons">
                                                                edit
                                                            </i>
                                                        </button>
                                                        <button className=" btn light-blue darken-4" 
                                                            style={{margin: '4px'}} 
                                                            onClick={ () => this.deleteTask(task._id)}>
                                                            <i className="material-icons">
                                                                delete
                                                            </i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
}

export default App;