'use client'
import { useState } from "react"

export default function Home() {

  const [file, setfile] = useState(null)
  const [imgUrl, setimgUrl] = useState(null)

  const handleonSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method:'POST',
      body: formData,
    })
    const data = await response.json()
    setimgUrl(data.url)
  }

  return (
    <div>
      <form onSubmit={handleonSubmit}>
        <input type="file" onChange={(e) => {
          setfile(e.target.files[0])
        }} />
        <button >
          enviar
        </button>
      </form>

      {
        imgUrl && (
          <div className='flex w-56 bg-red-900' >
            <img src={imgUrl} alt="" />
          </div>
        )
      }

    </div>
  )
}
