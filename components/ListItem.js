import Link from "next/link"

const getTime = (note) => {
  return new Date(note.updated).toLocaleDateString()
}

const getTitle = (note) => {
  let title = note.body.split("\n")[0]
  if (title.length > 45) {
    return title.slice(0, 45)
  }
  return title
}

const getContent = (note) => {
  let title = getTitle(note)
  let content = note.body.replaceAll("\n", " ")
  content = content.replaceAll(title, "")
  return content.length > 45 ? content.slice(0, 45) + "..." : content
}

const ListItem = ({ note }) => {
  return (
    <Link href={`/note/${note.id}`} passHref>
      <a>
        <div className="notes-list-item">
          <h3>{getTitle(note)}</h3>
          <p>
            <span>{getTime(note)}</span>
            {getContent(note)}
          </p>
        </div>
      </a>
    </Link>
  )
}

export default ListItem
