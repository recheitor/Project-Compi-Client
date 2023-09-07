const updateHouseRooms = (RoomDetails) => {
    RoomDetails.forEach(eachHouse => {
        let totalScore = 0
        eachHouse.rating.forEach(({ score }) => totalScore += score)
        totalScore = totalScore / eachHouse.rating.length
        eachHouse.totalScore = Math.round(totalScore)
        const updateLocation = { lat: eachHouse.location.coordinates[1], lng: eachHouse.location.coordinates[0] }
        eachHouse.location.coordinates = updateLocation
    })
    return RoomDetails
}

export default updateHouseRooms