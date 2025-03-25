import './index.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie";

function DashBoard() {
    const [cards, setCards] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getApiData = async () => {
            const response = await fetch("https://mapsappbackend-d2kk.onrender.com/dashboard", {
                headers: { Authorization: `Bearer ${Cookies.get("jwtToken")}` }
            })
            const data = await response.json()
            if (data) {
                setCards(JSON.parse(data.carddata))
                console.log(JSON.parse(data.carddata))
            }
        }
        getApiData()
    }, [])

    const handleCardClick = (id) => {
        navigate(`/map/${id}`)
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h1 className="dashboard-title">Maps Dashboard</h1>
                <div className="cards-container">
                    {cards.map(card =>
                        <div className="card" onClick={()=>handleCardClick(card.id)}>
                            <div className="image-container">
                                <img
                                    src="https://res.cloudinary.com/dpk6qsn0e/image/upload/v1742881435/2983550_zy1rez.jpg"
                                    alt={card.title}
                                    className="card-image"
                                />
                                <div className="card-title">{card.title}</div>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default DashBoard

