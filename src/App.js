import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Table, Menu, Grid, Image, Form, Button, Message } from 'semantic-ui-react';
import Kuva from './Images/alan_turing.jpg'

/*
const Menu = () => (
  <div>    
    <a href='#'>anecdotes</a>&nbsp;
    <a href='#'>create new</a>&nbsp;
    <a href='#'>about</a>&nbsp;
  </div>
)
*/

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table >
    <Table.Body>
    
      {anecdotes.map(anecdote => 
      <Table.Row key={anecdote.id} >
        <Table.Cell>
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </Table.Cell>
      <Table.Cell>
        {anecdote.author}
      </Table.Cell>
      </Table.Row>

      )}
    
    </Table.Body>
    </Table>
  </div>
)
const Note = ({ anecdote }) => {
  console.log(anecdote)
  return(
  <Table basic='very' >
  <Table.Header>
      <Table.Row>
        <Table.HeaderCell>content</Table.HeaderCell>
        <Table.HeaderCell>Votes</Table.HeaderCell>
        <Table.HeaderCell>See more info</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  <Table.Body>
    {anecdote.content}
    <Table.Cell>
    has {anecdote.votes}
    </Table.Cell>
    <Table.Cell>
    {anecdote.info}
    </Table.Cell>
   
    
    </Table.Body>
    </Table> 
)}

const About = () => (
  <Grid  style={{width: '6000px'}}>  
   <Grid.Column widht={8} >
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <p>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</p>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  
   </Grid.Column>
   <Grid.Column widht={2}>
   <Image src={Kuva} size='big' />
   </Grid.Column>
  </Grid>
)

const Footer = () => (
  <Menu color="black" fixed='bottom' inverted> 
    <Menu.Item link>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
    </Menu.Item>
   
    <Menu.Item link>
    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
    </Menu.Item>
  </Menu>
 
)


class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
    
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0,
      
    })
   
    
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit} >
          <Form.Field>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button type='submit'>create</Button>
        </Form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      message: null
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.sendMessage(anecdote)

   
  }
  sendMessage = (message) => {
    this.setState({ message:  `a new anecdote ${message.content} created` })
    console.log('apua', message)
    setTimeout(() => {
      this.setState({ message: null })
    }, 3000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
  

  render() {
     console.log(this.state.message)
    return (
      <Container>
    
    
     
        <h1>Software anecdotes</h1>
        <Router>
          <div>
           <Menu color='grey'  inverted>
             
             <Menu.Item link>
               <Link to = "/" ></Link>
             </Menu.Item>
             <Menu.Item link>
               <Link to="/anecdotes"> anecdotes</Link>
             </Menu.Item>  
             <Menu.Item link>
                <Link to="/create_new"> create_new</Link>
             </Menu.Item>  
             <Menu.Item link>
                <Link to="/about"> about</Link>
             </Menu.Item>  

            
            
            </Menu>  
            {(this.state.message &&
              <Message success>
                {this.state.message}
              </Message>
            )}
            <Route exact path= "/" render ={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes/:id" render={({match}) =>
                <Note anecdote={this.anecdoteById(match.params.id)} />}
                 />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/create_new" render={(() => <CreateNew addNew={this.addNew}/>)} />
         </div>
      

        
        </Router>  
      
       
        <Footer />
      
     
      
      </Container>
    );
  }
}

export default App;
