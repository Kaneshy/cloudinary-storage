'use client'
import { useState } from "react"
import '@/styles/tarjets.css'

function GalleryTarjets() {

    const [data, setdata] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    const calling = async () => {
        const response = await fetch('/api/upload', {
            method: 'GET',
        })
        const data = await response.json()
        setdata(data)
        setisLoading(true)
        console.log(data)

    }

    return (
        <>
            <div>
                <button onClick={calling} >call</button>
            </div>
            <div className="gridcontainer" >
                {isLoading && (data.map(item => {
                    return (
                        <div key={item.public_id} className="imgTarjet" >
                            <img src={item.url} alt="" />
                        </div>
                    )
                }))}
            </div>
        </>
    )
}

export default GalleryTarjets