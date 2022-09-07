import { useState } from "react"
import { ArrowLeft } from "../../components/assets/arrow-left"
import { useRouter } from "next/router"

export const getServerSideProps = async (context) => {
  let data = []
  let error = null
  const { noteId } = context.params

  try {
    if (noteId !== "new") {
      const res = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`)
      data = await res.json()
    }
  } catch (err) {
    error = JSON.stringify(err)
  }

  return {
    props: {
      data,
      noteId,
      error,
    },
  }
}

const NotePage = ({ data, noteId, error }) => {
  const router = useRouter()

  const [note, setNote] = useState(data)

  console.log(data, noteId, error)

  const createNote = async () => {
    await fetch(`http://127.0.0.1:8000/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
  }

  const updateNote = async () => {
    fetch(`http://127.0.0.1:8000/api/notes/${note.id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
  }

  const deleteNote = () => {
    fetch(`http://127.0.0.1:8000/api/notes/${note.id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    router.push("/")
  }

  const handleSubmit = () => {
    console.log(note)
    if (noteId !== "new" && !note.body) {
      deleteNote()
    } else if (noteId !== "new") {
      updateNote()
    } else if (noteId === "new" && note.body !== null) {
      createNote()
    }
    router.push("/")
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value })
        }}
        value={note?.body}
      />
    </div>
  )
}
export default NotePage

// GETTING RID OF USE EFFECT
// Making the call on SS every time the page is loaded
// Pasing the response as props!!

// useEffect(() => {
//   getNote()
// }, [])

// let getNote = async () => {
//   if (noteId === "new") return
//   try {
//     const res = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`)
//     const data = await res.json()
//     setNote(data)
//   } catch (err) {
//     console.log(err)
//   }
// }
