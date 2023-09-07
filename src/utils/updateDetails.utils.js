const updateHouseRoomsDetails = (houseRoomDetails) => {
    let totalScore = 0
    houseRoomDetails.rating.forEach(({ score }) => totalScore += score)
    totalScore = totalScore / houseRoomDetails.rating.length
    houseRoomDetails.totalScore = Math.round(totalScore)
    const updateLocation = { lat: houseRoomDetails.location.coordinates[1], lng: houseRoomDetails.location.coordinates[0] }
    houseRoomDetails.location.coordinates = updateLocation
    return houseRoomDetails
}


export default updateHouseRoomsDetails