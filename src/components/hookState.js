import React, { useState, useEffect } from 'react';

const TestingHooksState = () => {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addNote = (e) => {
    e.preventDefault()
    setNotes([
      ...notes,
      { title, body }
    ])
    setTitle('')
    setBody('')
  }

  const removeNote = (title) => {
    setNotes(notes.filter((item) => item.title !== title))
  }

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem('notes'))
    // console.log('entrou no useEffect do notesData')
    if (notesData) {
      setNotes(notesData)
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
    // console.log('entruo no useffect do localStorage')
  }, [notes, title])

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.title}>
          <Notes key={note.title} note={note} removeNote={removeNote} />
        </div>
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={body} onChange={e => setBody(e.target.value)}></textarea>
        <button>add note</button>
      </form>
    </div>
  );
}

const Notes = ({ note, removeNote }) => {

  useEffect(() => {
    console.log('Setting up effect!')

    return () => {
      console.log('Cleaning up effect!!')
    }
  }, [])

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  )
}

export default TestingHooksState
