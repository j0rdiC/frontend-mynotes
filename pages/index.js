import ListItem from "../components/ListItem"
import Link from "next/link"
import { PlusIcon } from "../components/assets/plus"

export const getStaticProps = async () => {
  let data = []
  let error = null
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}notes/`)
    data = await res.json()
  } catch (err) {
    error = err
  }
  return !error ? { props: { notes: data } } : { notFound: true }
}

const NotesListPage = ({ notes }) => {
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <div className="floating-button">
        <Link href="/note/new" passHref>
          <PlusIcon />
        </Link>
      </div>
    </div>
  )
}

export default NotesListPage

// export async function getStaticProps() {
//   let data = []
//   let error = null

//   try {
//     const res = await fetch("http://127.0.0.1:8000/api/notes/")
//     data = await res.json()
//   } catch (err) {
//     error = err
//   }

//   !error ? { props: { notes: data } } : { notFound: true }
// }
