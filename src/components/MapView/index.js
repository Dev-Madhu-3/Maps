import { useEffect, useState } from "react"
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import './index.css';


const MapUpdater = ({ center, zoom }) => {
    const map = useMap()
    useEffect(() => {
        map.setView(center, zoom)
    }, [center, zoom, map])
    return null
}

const MapView = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [mapData, setMapData] = useState({ center: [51.505, -0.09], zoom: 9 })

    useEffect(() => {
        const apiCall = async () => {
            const response = await fetch("https://mapsappbackend-d2kk.onrender.com/map", {
                method: "GET",
                headers: { Authorization: `Bearer ${Cookies.get("jwtToken")}` }
            })
            const data = await response.json()
            const parsedData = JSON.parse(data.mapdata)[id]
            // console.log(data)

            if (data) {
                setMapData(parsedData)
            }
        }
        apiCall()
    }, [id])



    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="map-header">
                    <h1 className="dashboard-title">Interactive Map</h1>
                    <button
                        className="back-button"
                        onClick={() => navigate('/dashboard')}
                    >
                        Back to Dashboard
                    </button>
                </div>
                <div className="map-card">
                    <MapContainer
                        center={mapData.center}
                        zoom={mapData.zoom}
                        style={{ height: "480px", width: "100%" }}
                    >
                        <MapUpdater center={mapData.center} zoom={mapData.zoom} />
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default MapView;